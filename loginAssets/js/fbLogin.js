// File dedicated to connect and "talk" to the database
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    set,
    child,
    update,
    remove,
    onValue
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

import { arrayUnion } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwKcX4hQj--aKX1WFMDhOtyZCDbSxUhAw",
    authDomain: "nesquikmap.firebaseapp.com",
    databaseURL: "https://nesquikmap-default-rtdb.firebaseio.com",
    projectId: "nesquikmap",
    storageBucket: "nesquikmap.appspot.com",
    messagingSenderId: "907555489292",
    appId: "1:907555489292:web:027b2cbdcde01d65c11029"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

var regBtn = document.getElementById('regisBtn');
var logBtn = document.getElementById('loginBtn');
var emailInput = document.getElementById('logInUsername');
var passwordInput = document.getElementById('logInPassword');

var searchable = [];
var positions = [];
var locations = [];

function InsertUser() {
    var regName = document.getElementById('regisUsername');
    var regEmail = document.getElementById('regisEmail');
    var regPass = document.getElementById('regisPassword');

    const dbRef = ref(db, "Users");
    let matchFound = false;

    onValue(
        dbRef,
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if (regEmail.value == childData.email) {
                    alert('Ooops! Parece que ya tienes una cuenta');
                    matchFound = true;
                    emailInput.value = regEmail.value;
                    container.classList.remove("right-panel-active");
                    return;
                }
            });
            if (!matchFound) {
                set(ref(db, "Users/" + crypto.randomUUID()), {
                    name: regName.value,
                    email: regEmail.value,
                    password: regPass.value,
                    data: {
                        currentChallenge: 'null',
                        pointsPerChallenge: 0,
                        totalPoints: 200
                    },
                    type: "user",
                })
                    .then(() => {
                        //alert("Registro con éxito");
                        emailInput.value = regEmail.value;
                        passwordInput.value = regPass.value;
                        container.classList.remove("right-panel-active");
                    })
                    .catch((error) => {
                        alert("Unsuccessful, error: " + error);
                    });
            }
        },
        {
            onlyOnce: true,
        }
    );
}
regBtn.addEventListener('click', InsertUser);

function verifyLogin() {
    var logEmail = document.getElementById('logInUsername');
    var logPass = document.getElementById('logInPassword');

    const dbRef = ref(db, "Users");
    let matchFound = false;

    onValue(
        dbRef,
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                //console.log(childData.email, childData.name, childData.password, childData.type);
                if (logEmail.value == childData.email && logPass.value == childData.password) {
                    localStorage.setItem('userName', childData.name);
                    localStorage.setItem('userType', childData.type);
                    localStorage.setItem('userEmail', childData.email);
                    localStorage.setItem('userData', JSON.stringify(childData.data));
                    window.location.href = "./mainPage/index.html"; matchFound = true;
                    return;
                }
            });
            if (!matchFound) {
                alert("Usuario y/o contraseña incorrectos!");
            }
        },
        {
            onlyOnce: true,
        }
    );
}
logBtn.addEventListener('click', verifyLogin);
