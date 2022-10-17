const fs = require('fs');
const csv = require('csv-parser');
const filtered_book = 'assets/data/filtered_book_3.csv';
const books = []
let publications = []
let authors = []

module.exports.index = (req, res) => {
    fs.createReadStream(filtered_book)
        .pipe(csv())
        .on('data', (data) => books.push(data))
        .on('end', () => {
            const query = req.query;
            let book_author = Object.keys(books[0])[0];
            let year_of_pub = Object.keys(books[0])[5];
            if (Object.keys(query).length !== 0) {
                const search_books = books.map(book => {
                    if (book[book_author].toLowerCase().includes(query.search.toLowerCase())) {
                        return book[book_author];
                    }
                });
                let filtered_search_books = search_books.filter(Boolean);
                filtered_search_books = [...new Set(filtered_search_books)]
                res.render('index', {
                    title: 'E-Athenaeum',
                    publications,
                    authors: filtered_search_books,
                    load_more: false
                });
                return;
            }
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
                authors,
                load_more: true
            });
        });
}

module.exports.view = (req, res) => {
    const query = req.query;
    let book_author = Object.keys(books[0])[0];
    const resultbooks = books.filter(filtbook => filtbook[book_author] === query.search);
    res.render('view', {
        title: 'E-Athenaeum',
        author: query.search,
        resultbooks
    });
}

module.exports.getcart = (req, res) => {
    res.render('cart', {
        title: 'E-Athenaeum',
        books: undefined
    });
}

module.exports.postcart = (req, res) => {
    const cart = JSON.parse(req.body.cart);
    const books = [];
    let cartbooks = [];
    fs.createReadStream(filtered_book)
        .pipe(csv())
        .on('data', (data) => books.push(data))
        .on('end', () => {
            if (cart) {
                for (let ci of cart) {
                    let cartbook = books.map(book => {
                        if (Number(book.ISBN) === ci.id) {
                            return { ...book, qty: ci.qty };
                        }
                    });
                    cartbook = cartbook.filter(Boolean);
                    cartbooks.push(...cartbook);
                }
            }
            return res.status(200).json({ books: cartbooks });
        });

}