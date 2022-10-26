const loginform = document.getElementById('login');
const signupform = document.getElementById('signup');
const url = window.origin;

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
            console.log(res);
            if (res.length > 0) {
                if (res[0] === 200) {
                    localStorage.setItem('token', res[1].token);
                    window.location = '/';
                    return;
                }
                const message = res[1].message;
                const authmsg = document.getElementById('auth-message');
                authmsg.style.display = 'block';
                authmsg.innerHTML = '';
                const strong = document.createElement('strong');
                strong.innerHTML = message;
                authmsg.appendChild(strong);
            }
        })
        .catch(err => console.log(err));
});

signupform?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const pwd = event.target[1].value;
    const repwd = event.target[2].value;
    const repeatpwd = document.getElementsByName('repsw');
    const authmsg = document.getElementById('auth-message');
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
                if (res.length > 0) {
                    if (repeatpwd && repeatpwd.length > 0) {
                        repeatpwd[0].style.border = '1px solid #ced4da';
                    }
                    if(res[0] === 401) {
                        const message = res[1].message;
                        authmsg.style.display = 'block';
                        authmsg.innerHTML = '';
                        const strong = document.createElement('strong');
                        strong.innerHTML = message;
                        authmsg.appendChild(strong);
                    }
                    if(res[0] === 201) {
                        authmsg.style.display = 'block';
                        authmsg.innerHTML = '';
                        const strong = document.createElement('strong');
                        strong.innerHTML = 'Account created successfully please login to continue';
                        authmsg.appendChild(strong);
                    }
                }
            })
            .catch(err => console.log(err));
    }
    if (pwd !== repwd) {
        if (repeatpwd && repeatpwd.length > 0) {
            repeatpwd[0].style.border = '1px solid red';
        }
        authmsg.style.display = 'block';
        authmsg.innerHTML = '';
        const strong = document.createElement('strong');
        strong.innerHTML = 'Please make sure your password match';
        authmsg.appendChild(strong);
    }
});

export default { loginform, signupform };