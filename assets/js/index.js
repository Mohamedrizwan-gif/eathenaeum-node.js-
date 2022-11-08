import { pagecart } from '/js/cart.js';
import view from '/js/view.js';

const loginform = document.getElementById('login');
const signupfrom = document.getElementById('signup');
const alertmsg = document.getElementById('auth-message');
const token = localStorage.getItem('token');
const url = window.location.origin;

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
            if (res[0] === 401) {
                alertmsg.innerHTML = '';
                const message = res[1].message;
                const strong = document.createElement('strong');
                strong.innerText = message;
                alertmsg.appendChild(strong);
                alertmsg.style.display = 'block';
            }
            if(res[0] == 200) {
                localStorage.setItem('token', res[1].idToken);
                window.location.assign('/');
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
                if (res[0] === 401) {
                    alertmsg.innerHTML = '';
                    const message = res[1].message;
                    const strong = document.createElement('strong');
                    strong.innerText = message;
                    alertmsg.appendChild(strong);
                    alertmsg.style.display = 'block';
                }
                if(res[0] === 200) {
                    alert('signup success');
                    window.location.assign('/login');
                }
            })
            .catch(err => console.log(err));
    }
});

function logout() {
    localStorage.clear();
    window.location.assign('/login');
}

window.logout = logout;

function loadpublisher() {
    const search = location.search.split('?');
    let limit = 0;
    if(search.length > 0) {
        if(search.length === 1) {
            limit = 10;
        }
        else if(search[1].includes('limitpublish')) {
            limit = Number(search[1].split('=')[1]);
            limit = limit + 10;
        }
        else if(search[1].includes('publish')) {
            limit = 10;   
        }
        else if(search[1].includes('author')) {
            limit = 10;   
        }
        else {
            limit = 10;
        }
    }
    window.location.assign(`/?limitpublish=${limit}#publish`);
}

window.loadpublisher = loadpublisher;

function loadauthor() {
    const search = location.search.split('?');
    let limit = 0;
    if(search.length > 0) {
        if(search.length === 1) {
            limit = 10;
        }
        else if(search[1].includes('limitauthor')) {
            limit = Number(search[1].split('=')[1]);
            limit = limit + 10;
        }
        else if(search[1].includes('publish')) {
            limit = 10;   
        }
        else if(search[1].includes('author')) {
            limit = 10;   
        }
        else {
            limit = 10;
        }
    }
    window.location.assign(`/?limitauthor=${limit}#author`);
}

window.loadauthor = loadauthor;

function navigatebookview(event) {
    window.location.assign(`/view?searchpublish=${event.srcElement.innerHTML}`);
}

window.navigatebookview = navigatebookview;

function navigateauthorview(event) {
    window.location.assign(`/view?searchauthor=${event.srcElement.innerHTML}`);
}

window.navigateauthorview = navigateauthorview;

function onPublishSearch(event) {
    event.preventDefault();
    const search = event.srcElement[0].value;
    window.location.assign(`/?publish=${search}`);
}

window.onPublishSearch = onPublishSearch;

function onAuthorSearch(event) {
    event.preventDefault();
    const search = event.srcElement[0].value;
    window.location.assign(`/?author=${search}`);
}

window.onAuthorSearch = onAuthorSearch;

document.addEventListener('DOMContentLoaded', () => {
    pagecart();
    let loadedlogin = localStorage.getItem('loginpage');
    if(token !== null || token !== undefined) {
        if(!loadedlogin) {
            window.location.assign('/login');
            localStorage.setItem('loginpage', 'login');
            alert('Please login to continue');
        }
    }    
});