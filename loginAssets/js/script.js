const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const email = document.getElementById('username');
const pwd = document.getElementById('pwd');
const logBtn = document.getElementById('loginBtn');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

logBtn.addEventListener('click', () => {
    if (email.value == "admin" && pwd.value == "1234") {
        window.location.href = "mainPage/index.html";
    }
});
