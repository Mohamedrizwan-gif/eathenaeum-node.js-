const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAcfHl4zjejt6hBGefMF6fAZ3LdH49ZKnw",
    authDomain: "e-athenaeum.firebaseapp.com",
    projectId: "e-athenaeum",
    storageBucket: "e-athenaeum.appspot.com",
    messagingSenderId: "983896565215",
    appId: "1:983896565215:web:23192e8ff8b658c8b9d06a",
    measurementId: "G-WZQ3SBFP73"
};

module.exports = firebase.initializeApp(firebaseConfig);;