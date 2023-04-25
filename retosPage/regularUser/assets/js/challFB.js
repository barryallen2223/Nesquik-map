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

const startChall = document.getElementById('startCapture');

function DBToJSON() {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, "CTF");
        onValue(
            dbRef,
            (snapshot) => {
                const infoDB = {};
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    var data = {};
                    var cdPlace = childData.places;
                    data['places'] = cdPlace;
                    infoDB[childData.title] = data;
                });
                resolve(infoDB);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

startChall.addEventListener('click', () => {
    DBToJSON().then((infoDB) => {
        localStorage.setItem('CTF', JSON.stringify(infoDB));
    }).catch((error) => {
        console.error(error);
    });
})
