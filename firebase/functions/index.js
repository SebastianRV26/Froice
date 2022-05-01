const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
    };
    await admin.firestore().collection("users").doc(user.uid).set(userData);
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("already-exists", error.message);
  }
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  let userData = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    phoneNumber: user.phoneNumber,
  };
  return admin.firestore().collection("users").doc(user.uid).set(userData);
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
