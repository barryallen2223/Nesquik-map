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

var fullPlaceName = document.getElementById("placeName");
var latV = parseFloat(localStorage.getItem('lat'));
var lngV = parseFloat(localStorage.getItem('lng'));

var locations = { lat: latV, lng: lngV };

var title = document.getElementById("challTitle");

var insBtn = document.getElementById("Insbtn");
//var selBtn = document.getElementById("//Selbtn");
var delBtn = document.getElementById("Delbtn");
var sendBtn = document.getElementById("Sendbtn");
var backBtn = document.getElementById("btnBack");


var places = {};

function writeInListPlaces() {
    var plName = localStorage.getItem('plName');
    var vic = localStorage.getItem('vic');
    var lat = localStorage.getItem('lat');
    var lng = localStorage.getItem('lng');
    var hyphen = "&#10687; ";
    places[plName] = {
        title: plName,
        vicinity: vic,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
    };
    localStorage.setItem('lstPlaces', JSON.stringify(places));
    document.getElementById('listPlaces').innerHTML += hyphen.concat(plName, '<br>');
}

insBtn.addEventListener('click', writeInListPlaces);

function removePlace() {
    var plName = localStorage.getItem('plName');
    var places = JSON.parse(localStorage.getItem('lstPlaces'));
    var hyphen = "&#10687; ";
    if (places.hasOwnProperty(plName)) {
        document.getElementById('listPlaces').innerHTML = '';
        delete places[plName];
        Object.keys(places).forEach(function (place) {
            var hyphen = "&#10687; ";
            document.getElementById('listPlaces').innerHTML += hyphen.concat(place, '<br>');
        });
    }
    localStorage.setItem('lstPlaces', JSON.stringify(places));
    //console.log(places);
}
delBtn.addEventListener('click', removePlace);

function InsertCTF() {
    set(ref(db, "CTF/" + title.value), {
        title: title.value,
        places: JSON.parse(localStorage.getItem('lstPlaces'))
    })
        .then(() => {
            alert("Data stored successfully!");
        })
        .catch((error) => {
            alert("Unsuccessful, error: " + error);
        });
}
sendBtn.addEventListener('click', InsertCTF);


var currentUrl = window.location.href;
currentUrl = currentUrl.replace('/retosPage/admin/index.html', '');

backBtn.addEventListener('click', () => {
    /* const newPath = '/mainPage/index.html';
    const newUrl = `${currentUrl}${newPath}`;
    window.location.href = newUrl; */

    window.location.href = window.location.href.replace("/retosPage/admin/", "/mainPage/");
});

