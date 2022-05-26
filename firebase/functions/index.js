const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { arrayLeftOuterJoin, generateKey } = require("./utils");

admin.initializeApp();

exports.signUp = functions.https.onCall(async (data) => {
  const email = data.email;
  const password = data.password;
  try {
    let user = await admin.auth().createUser({
      displayName: data.firstName + " " + data.lastName,
      email,
      password,
      phoneNumber: "+506" + data.phone,
    });
    await admin.auth().setCustomUserClaims(user.uid, {
      role: "user",
    });
    let userData = {
      uid: user.uid,
      email: email,
      name: data.firstName + " " + data.lastName,
      phoneNumber: "+506" + data.phone,
      photoURL: user.photoURL,
    };
    await admin.firestore().collection("users").doc(user.uid).set(userData);
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("already-exists", error.message);
  }
});

exports.createUser = functions.auth.user().onCreate(async (user) => {
  let userData = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  };
  const claimsPromise = admin.auth().setCustomUserClaims(user.uid, {
    role: "user",
  });
  const saveUserPromise = admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(userData);
  return Promise.all([claimsPromise, saveUserPromise]);
});

exports.modifyUser = functions.firestore
  .document("users/{userID}")
  .onWrite((change, context) => {
    if (!change.after.exists) {
      return null;
    }
    const document = change.after.data();
    return admin.auth().updateUser(change.after.id, {
      uid: change.after.id,
      email: document.email,
      displayName: document.name,
      phoneNumber: document.phoneNumber,
    });
  });

exports.deleteUser = functions.firestore
  .document("users/{userID}")
  .onDelete((snap, context) => {
    return admin.auth().deleteUser(snap.id);
  });

exports.onFollow = functions.firestore
  .document("users/{userID}")
  .onUpdate((change, context) => {
    const newFollowing = change.after.data().following;
    const previousFollowing = change.before.data().following;

    // Se quieren solo los nuevos followers que se han agregado a la lista
    // Para eso se puede hacer algo como un left outer join de ambas listas
    const following = arrayLeftOuterJoin(previousFollowing, newFollowing);
    const promises = [];
    for (let follow of following) {
      promises.push(
        admin
          .firestore()
          .collection("users")
          .doc(follow)
          .collection("notifications")
          .doc(generateKey(change.after.id + context.eventId))
          .set({
            userId: change.after.id,
            name: change.after.data().name,
            action: "following",
            date: new Date(),
          })
      );
    }
    return Promise.all(promises);
  });

exports.onOpinionCreated = functions.firestore
  .document("opinions/{opinionId}")
  .onCreate((snap, context) => {
    const newComment = snap.data();
    if (!newComment.parent) {
      return null;
    }

    const parentCommentRef = admin
      .firestore()
      .collection("opinions")
      .doc(newComment.parent);
    return admin.firestore().runTransaction(async (transaction) => {
      const parentCommentDoc = await transaction.get(parentCommentRef);
      if (parentCommentDoc.empty) {
        return null;
      }

      // Ignore the notification if it's the same user
      if (newComment.userId === parentCommentDoc.data().userId) {
        return null;
      }

      return admin
        .firestore()
        .collection("users")
        .doc(parentCommentDoc.data().userId)
        .collection("notifications")
        .doc(generateKey(newComment.userId + context.eventId))
        .set({
          userId: newComment.userId,
          name: newComment.name,
          action: "comment",
          date: new Date(),
        });
    });
  });
