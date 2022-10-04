const loginform = document.getElementById('login');
const signupfrom = document.getElementById('signup');
const url = 'http://localhost:3200';

loginform?.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('login');
    location.href = '/';
});

signupfrom?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const pwd = event.target[1].value;
    const repwd = event.target[2].value;

    if(pwd === repwd) {
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
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }    
});

function loadauthor() {
    const search = location.search.split('?');
    let limit = 0;
    if(search.length == 1) {
        limit = 10;
    }
    else {
        limit = search[1].split('=')[1];
    }
    let lim = Number(limit) + 10;
    if(search.length == 1) {
        lim = 10;
    }
    window.location.assign(`/?author=${lim}#author`);
}

function navigateauthorpage(author) {
    window.location.assign(`/result?search=${author.srcElement.innerHTML}`);
}

document.addEventListener('DOMContentLoaded', () => {

});