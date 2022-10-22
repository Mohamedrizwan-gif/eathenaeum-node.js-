const firebase = require('firebase/app');
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })

const firebaseConfig = {
    apiKey: process.env.FIREBASEAPI,
    authDomain: "e-athenaeum.firebaseapp.com",
    projectId: "e-athenaeum",
    storageBucket: "e-athenaeum.appspot.com",
    messagingSenderId: process.env.FIREBASEMESSAGESENDERID,
    appId: process.env.FIREBASEAPPID,
    measurementId: process.env.FIREBASEMEASUREMENTID
};

module.exports = firebase.initializeApp(firebaseConfig);;