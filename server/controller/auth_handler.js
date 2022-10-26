const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const firebase = require('../../config/firebase');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    }
    catch (err) {
        console.log(Object.keys(err.customData));
    }
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
        if (err.customData && err.customData._tokenResponse && err.customData._tokenResponse.error) {
            const { code, message } = err.customData._tokenResponse.error;
            res.status(code).json({ message });
        }
    }
}

