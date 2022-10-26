import { pagecart } from '/js/cart.js';
import view from '/js/view.js';
import auth from '/js/auth.js';

const token = localStorage.getItem('token');
const modal = document.getElementById('myModal');
if(token === null) {
    if(modal) {
        modal.style.display = 'block';
    }
}
else {
    if(modal) {
        modal.style.display = 'none';
    }
}


function closemodal() {
    modal.style.display = 'none';
}

window.closemodal = closemodal;

function navigatecart(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if(token === null) {
        modal.style.display = 'block';
        return;
    }
    window.location = '/cart';
}

window.navigatecart = navigatecart;

function loadpublisher() {
    // const token = localStorage.getItem('token');
    // if(token === null) {
    //     modal.style.display = 'block';
    //     return;
    // }
    const search = location.search.split('?');
    let limit = 0;
    if (search.length == 1) {
        limit = 10;
    }
    else {
        limit = search[1].split('=')[1];
    }
    console.log(limit)
    let lim = Number(limit) + 10;
    if (search.length == 1) {
        lim = 10;
    }
    window.location.assign(`/?limitpublish=${lim}#publish`);
}

window.loadpublisher = loadpublisher;

function loadauthor() {
    const token = localStorage.getItem('token');
    if(token === null) {
        modal.style.display = 'block';
        return;
    }
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
    const token = localStorage.getItem('token');
    if(token === null) {
        modal.style.display = 'block';
        return;
    }
    window.location.assign(`/view?searchpublish=${event.srcElement.innerHTML}`);
}

window.navigatebookview = navigatebookview;

function navigateauthorview(event) {
    const token = localStorage.getItem('token');
    if(token === null) {
        modal.style.display = 'block';
        return;
    }
    window.location.assign(`/view?searchauthor=${event.srcElement.innerHTML}`);
}

window.navigateauthorview = navigateauthorview;

function onAuthorSearch(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if(token === null) {
        modal.style.display = 'block';
        return;
    }
    const search = event.srcElement[0].value;
    window.location.assign(`/?author=${search}`);
}

window.onAuthorSearch = onAuthorSearch;

function onBookSearch(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if(token === null) {
        modal.style.display = 'block';
        return;
    }
    const search = event.srcElement[0].value;
    window.location.assign(`/?publish=${search}`);
}

window.onBookSearch = onBookSearch;

document.addEventListener('DOMContentLoaded', () => {
    pagecart();
});