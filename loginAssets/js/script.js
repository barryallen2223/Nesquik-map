window.addEventListener('load', function () {
    let url = window.location.href.split('#')[0];
    history.pushState({}, null, url + '?#');
    localStorage.clear();
    console.log('localStorage cleared!');
});

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

