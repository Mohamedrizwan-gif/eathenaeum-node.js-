const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const fs = require('fs')
const csv = require('csv-parser');

const firebase = require('../../config/firebase');
const filtered_book = 'assets/data/filtered_book_1.csv';
const books = []
let publications = []
let authors = []

// const admin = require('firebase-admin');
// const serviceAccount = require('../../serviceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://e-athenaeum-default-rtdb.firebaseio.com'
// });

module.exports.index = (req, res) => {
    fs.createReadStream(filtered_book)
        .pipe(csv())
        .on('data', (data) => books.push(data))
        .on('end', () => {
            const query = req.query;
            let book_author = Object.keys(books[0])[0];
            let year_of_pub = Object.keys(books[0])[7];
            publications = books.map(data => data[year_of_pub]);
            authors = books.map(data => data[book_author]);
            publications = [...new Set(publications)];
            authors = [...new Set(authors)];
            publications.sort()
            authors.sort()
            if (Object.keys(query).length > 0) {
                const author_limit = query['author'];
                authors = authors.slice(0, author_limit);
            }
            else {
                authors = authors.slice(0, 10);
            }
            res.render('index', {
                title: 'E-Athenaeum',
                publications,
                authors
            });
        });
}

module.exports.login = (req, res) => {
}

module.exports.signup = async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(auth, email, password);
        // const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // console.log(user)
    }
    // try {
    //     const userResponse = await admin.auth().createUser({
    //         email: email,
    //         password: password,
    //         emailVerified: false,
    //         disabled: false 
    //     });
    // }
    catch(err) {
        console.log('error', err);
    }
    // console.log(userResponse);
}

module.exports.result = (req, res) => {
    const query = req.query;
    let book_author = Object.keys(books[0])[0];
    const resultbooks = books.filter(filtbook => filtbook[book_author] === query.search);
    res.render('result', {
        title: 'E-Athenaeum',
        author: query.search,
        resultbooks
    });
}