const fs = require('fs');
const csv = require('csv-parser');
const filtered_book = 'assets/data/filtered_book_4.csv';

module.exports = (req, res) => {
    const books = [];
    const query = req.query;
    fs.createReadStream(filtered_book)
    .pipe(csv())
    .on('data', (data) => {
        let book_author = Object.keys(data)[0];
        let book_title = Object.keys(data)[1];
        let book_isbn = Object.keys(data)[2];
        let book_price = Object.keys(data)[3];
        let book_publish = Object.keys(data)[4];
        let book_yearofpublish = Object.keys(data)[5];
        let transform_data = {
            'BookAuthor': data[book_author],
            'BookTitle': data[book_title],
            'BookIsbn': data[book_isbn],
            'BookPrice': data[book_price],
            'BookPublisher': data[book_publish],
            'YearOfPublish': data[book_yearofpublish]
        }
        books.push(transform_data) 
    })
    .on('end', () => {
        let book_author = Object.keys(books[0])[0];
        let book_publish = Object.keys(books[0])[4];
        let resultbooks;
        if(query.searchpublish !== undefined) {
            resultbooks = books.filter(fbook => fbook[book_publish] === query.searchpublish);
        }
        if(query.searchauthor !== undefined) {
            resultbooks = books.filter(filtbook => filtbook[book_author] === query.searchauthor); 
        }
        res.render('view', {
            title: 'E-Athenaeum',
            book_author: book_author,
            resultbooks
        });
    });    
}