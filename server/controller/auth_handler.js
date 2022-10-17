const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const firebase = require('../../config/firebase');

// const admin = require('firebase-admin');
// const serviceAccount = require('../../serviceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://e-athenaeum-default-rtdb.firebaseio.com'
// });



module.exports.login = (req, res) => {
}

module.exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        // const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // console.log(user)
    }
    catch (err) {
        if (err.customData) {
            const { code, message } = err.customData._tokenResponse.error;
            res.status(code).json({ message });
        }
    }
}

