const fs = require('fs');
const csv = require('csv-parser');
const filtered_book = 'assets/data/filtered_book_3.csv';

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