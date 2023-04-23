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

const logoutBtn = document.getElementById('logoutBtn');
const challengeBtn = document.getElementById('challengeBtn');
const markerBtn = document.getElementById('markerBtn');

var searchable = [];
var positions = [];
var locations = [];

function DBToJSON() {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, "Places");
        onValue(
            dbRef,
            (snapshot) => {
                const infoDB = {};
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    var data = {};
                    data['address'] = childData.address;
                    data['description'] = childData.description;
                    data['title'] = childData.title;
                    data['type'] = childData.type;
                    data['rating'] = childData.rating;
                    data['bathroom'] = childData.bathroom;
                    data['chargePoint'] = childData.chargePoint;
                    data['accessibleEntrance'] = childData.accessibleEntrance;
                    data['comments'] = childData.comments;
                    data['position'] = childData.position;
                    data['visibility'] = childData.visibility;
                    data['fullPlaceName'] = childData.fullPlaceName;
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

DBToJSON().then((infoDB) => {
    searchable = Object.keys(infoDB);
    localStorage.setItem("searchable", JSON.stringify(searchable));
    searchable.forEach(place => {
        var loc = infoDB[place];
        var generalPlace = infoDB[place];
        positions.push(loc.position);
        locations.push(generalPlace);
    })
    localStorage.setItem("positions", JSON.stringify(positions));
    localStorage.setItem("locations", JSON.stringify(locations));
}).catch((error) => {
    console.error(error);
});

logoutBtn.addEventListener('click', () => {
    window.location.href = "../index.html";
});

challengeBtn.addEventListener('click', () => {
    window.location.href = "/retosPage/index.html";
});

markerBtn.addEventListener('click', () => {
    window.location.href = "/markerPage/index.html";
});