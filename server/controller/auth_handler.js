const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const firebase = require('../../config/firebase');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        const response = await signInWithEmailAndPassword(auth, email, password);
        if(response && response._tokenResponse) {
            res.status(200).json({
                idToken: response._tokenResponse.idToken,
                message: 'login successfully'
            });
        }
    }
    catch (err) {
        if(err && err.code) {
            const message = err.code.split('/')[1];
            res.status(401).json({
                message: message
            });
        }
    }
}

module.exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        if(response && response._tokenResponse) {
            res.status(200).json({
                idToken: response._tokenResponse.idToken,
                message: 'signup successfully'
            });
        }
    }
    catch (err) {
        if (err.customData && err.customData._tokenResponse && err.customData._tokenResponse.error) {
            const { message } = err.customData._tokenResponse.error;
            res.status(401).json({ message });
            return;
        }
        if(err && err.code) {
            const message = err.code.split('/')[1];
            res.status(401).json({
                message: message
            });
            return;
        }
    }
}

