import { pagecart } from '/js/cart.js';
import view from '/js/view.js';

const loginform = document.getElementById('login');
const signupfrom = document.getElementById('signup');
const url = 'http://localhost:3200';

loginform?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const pwd = event.target[1].value;

    fetch(url + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'password': pwd
        })
    })
        .then(res => Promise.all([Promise.resolve(res.status), res.json()]))
        .then(res => {
            console.log(res)
            if (res[0] === 400) {

            }
        })
        .catch(err => console.log(err));
});

signupfrom?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const pwd = event.target[1].value;
    const repwd = event.target[2].value;

    if (pwd === repwd) {
        fetch(url + '/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': pwd
            })
        })
            .then(res => Promise.all([Promise.resolve(res.status), res.json()]))
            .then(res => {
                console.log(res)
                if (res[0] === 400) {

                }
            })
            .catch(err => console.log(err));
    }
});

function loadpublisher() {
    const search = location.search.split('?');
    let limit = 0;
    if (search.length == 1) {
        limit = 10;
    }
    else {
        limit = search[1].split('=')[1];
    }
    let lim = Number(limit) + 10;
    if (search.length == 1) {
        lim = 10;
    }
    window.location.assign(`/?limitpublish=${lim}#publish`);
}

window.loadpublisher = loadpublisher;

function loadauthor() {
    const search = location.search.split('?');
    let limit = 0;
    if (search.length == 1) {
        limit = 10;
    }
    else {
        limit = search[1].split('=')[1];
    }
    let lim = Number(limit) + 10;
    if (search.length == 1) {
        lim = 10;
    }
    window.location.assign(`/?limitauthor=${lim}#author`);
}

window.loadauthor = loadauthor;

function navigatebookview(event) {
    window.location.assign(`/view?searchpublish=${event.srcElement.innerHTML}`);
}

window.navigatebookview = navigatebookview;

function navigateauthorview(event) {
    window.location.assign(`/view?searchauthor=${event.srcElement.innerHTML}`);
}

window.navigateauthorpage = navigateauthorview;

function onAuthorSearch(event) {
    event.preventDefault();
    const search = event.srcElement[0].value;
    window.location.assign(`/?author=${search}`);
}

window.onAuthorSearch = onAuthorSearch;

function onBookSearch(event) {
    event.preventDefault();
    const search = event.srcElement[0].value;
    window.location.assign(`/?book=${search}`);
}

window.onBookSearch = onBookSearch;

document.addEventListener('DOMContentLoaded', () => {
    pagecart();
});