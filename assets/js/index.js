const loginform = document.getElementById('login');
const signupfrom = document.getElementById('signup');

loginform?.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('login');
    location.href = '/';
});

signupfrom?.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('signup');
    location.href = '/';    
});