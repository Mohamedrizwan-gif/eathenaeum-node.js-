const fs = require('fs');
const csv = require('csv-parser');
const filtered_book = 'assets/data/filtered_book_4.csv';
const books = [];

module.exports = (req, res) => {
    fs.createReadStream(filtered_book)
        .pipe(csv())
        .on('data', (data) => books.push(data))
        .on('end', () => {
            const query = req.query;
            let book_author = Object.keys(books[0])[0];
            let publisher = Object.keys(books[0])[4];
            let search_author, search_publish, filtered_search_author, filtered_search_publish; 
            let load_author = true, load_publish = true; 
            if(query.publish !== undefined) {
                load_publish = false;
                search_publish = books.map(book => {
                    if (book[publisher].toLowerCase().includes(query.publish.toLowerCase())) {
                        return book[publisher];
                    }
                });
            }
            if(query.author !== undefined) {
                console.log(query.author);
                load_author = false;
                search_author = books.map(book => {
                    if (book[book_author].toLowerCase().includes(query.author.toLowerCase())) {
                        return book[book_author];
                    }
                });
            }
            if(search_author) {
                filtered_search_author = search_author.filter(Boolean);
                filtered_search_author = [...new Set(filtered_search_author)];
            }
            if(filtered_search_author === undefined) {
                filtered_search_author = books.map(data => data[book_author]);
                filtered_search_author = [...new Set(filtered_search_author)];
                filtered_search_author.sort();
                if(query.limitauthor === undefined) {
                    filtered_search_author = filtered_search_author.slice(0, 5);
                }
                else {
                    filtered_search_author = filtered_search_author.slice(0, Number(query['limitauthor']));
                }
            }
            if(search_publish) {
                filtered_search_publish = search_publish.filter(Boolean);
                filtered_search_publish = [...new Set(filtered_search_publish)];
            }
            if(filtered_search_publish === undefined) {
                filtered_search_publish = books.map(data => data[publisher]);
                filtered_search_publish = [...new Set(filtered_search_publish)];
                filtered_search_publish.sort();
                if(query.limitpublish === undefined) {
                    filtered_search_publish = filtered_search_publish.slice(0, 5);
                }
                else {
                    filtered_search_publish = filtered_search_publish.slice(0, Number(query['limitpublish']));
                }
            }
            res.render('index', {
                title: 'E-Athenaeum',
                authors: filtered_search_author,
                books: filtered_search_publish,
                load_author: load_author,
                load_publish: load_publish
            });
        });
}