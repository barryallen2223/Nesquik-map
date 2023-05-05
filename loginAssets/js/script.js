window.addEventListener('load', function () {
    let cleanUrl = window.location.href.split('/').slice(0, 3).join('/') + '/index.html';
    history.replaceState({}, null, cleanUrl);

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

