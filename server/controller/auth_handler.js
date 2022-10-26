const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const firebase = require('../../config/firebase');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        const response = await signInWithEmailAndPassword(auth, email, password);
        if(response) {
            if(response._tokenResponse) {
                res.status(200).json({
                    email: response._tokenResponse.email,
                    token: response._tokenResponse.idToken,
                    refreshToken: response._tokenResponse.refreshToken,
                    message: 'account verified'
                });
            }
        }
    }
    catch (err) {
        if(err) {
            if(err.code) {
                const message = err.code.split('/')[1];
                res.status(401).json({message});
            }
        }
    }
}

module.exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        if(response) {
            if(response._tokenResponse) {
                res.status(201).json({
                    email: response._tokenResponse.email,
                    token: response._tokenResponse.idToken,
                    message: 'account created'
                });
            }
        }
    }
    catch (err) {
        if(err.code) {
            const message = err.code.split('/')[1];
            res.status(401).json({message});
        }
        // if (err.customData && err.customData._tokenResponse && err.customData._tokenResponse.error) {
        //     const { code, message } = err.customData._tokenResponse.error;
        //     res.status(code).json({ message });
        // }
    }
}

