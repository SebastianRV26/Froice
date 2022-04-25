const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();

exports.signUp = functions.https.onCall(async (data) => {
    const email = data.email;
    const password = data.password;
    console.log(data);
    try {
        let user = await admin.auth().createUser({
            displayName: (data.firstName + " " + data.lastName),
            email,
            password,
            phoneNumber: "+506"+data.phone
        });
        await admin.auth().setCustomUserClaims(user.uid, {
            role: "user",
        });
        let userData = {
            "uid":user.uid,
            "email":email,
            "name":(data.firstName + " " + data.lastName),
            "phoneNumber":"+506"+data.phone
        }
        await admin.firestore().collection('users').doc(user.uid).set({user: userData});

    } catch (error) {
        console.error(error);
        throw new functions.https.HttpsError("already-exists", error.message);
    }
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    // ...
  }); 