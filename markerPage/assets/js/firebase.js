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

const radioButtons = document.querySelectorAll('input[type="radio"]');
var rating;
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        rating = radio.value;
    });
});

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");

var randomNames = ["Tortuga", "Liebre", "Leon", "Leopardo", "Panda", "Pinguino", "Gato", "Ardilla", "Estrella de mar", "Lemur", "Foca", "Mono", "Gorila", "Conejo", "Saltamontes", "Mariposa", "Delfin", "Oso", "Elefante", "Jirafa", "Loro"];
var randomAdjetives = ["Dulce", "Suave", "Sonriente", "Fuerte", "Agil", "Alegre", "Veloz", "Audaz", "Amigable", "Adorable"];
/* var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn"); */


function InserData() {
    //verifyPlace();

    var fullPlaceName = document.getElementById("placeName");
    var latV = parseFloat(localStorage.getItem('lat'));
    var lngV = parseFloat(localStorage.getItem('lng'));

    var locations = { lat: latV, lng: lngV };

    var bathroom = document.getElementById("bathroom");
    var charge = document.getElementById("charge");
    var entrance = document.getElementById("entrance");
    var comments = document.getElementById("comments");

    var plName = localStorage.getItem('plName');
    var vic = localStorage.getItem('vic');
    
    const dbRef = ref(db, "Places");
    DBToJSON().then((infoDB) => {
        // Do something with the infoDB object
        const existPlace = infoDB.hasOwnProperty(plName);
        //console.log(infoDB);
        if (existPlace) {
            // console.log('Si existe');
            var ratingAux = infoDB[plName];
            var nameRelated = randomNames[Math.floor(Math.random() * randomNames.length)].concat(' ', randomAdjetives[Math.floor(Math.random() * randomAdjetives.length)]);

            if (Array.isArray(ratingAux.rating)) {
                ratingAux.rating.push(parseInt(rating));
            } else {
                ratingAux.rating = [ratingAux.rating, parseInt(rating)];
            }
            if (Array.isArray(ratingAux.comments)) {
                ratingAux.comments.push(nameRelated.concat(' | ', comments.value));
            } else {
                ratingAux.comments = [ratingAux.comments, nameRelated.concat(' | ', comments.value)];
            }
            console.log(ratingAux.rating, ratingAux.comments);
            update(ref(db, "Places/" + plName), {
                rating: ratingAux.rating,
                bathroom: bathroom.checked ? parseInt(bathroom.value) : 0,
                chargePoint: charge.checked ? parseInt(charge.value) : 0,
                accessibleEntrance: entrance.checked ? parseInt(entrance.value) : 0,
                comments: ratingAux.comments,
            })
                .then(() => {
                    alert("Data updated successfully!");
                })
                .catch((error) => {
                    alert("Unsuccessful, error: " + error);
                });
        }
        else {
            // console.log('No existe');
            var ratingAux = [];
            ratingAux.push(parseInt(rating));
            var commentAux = [];
            var nameRelated = randomNames[Math.floor(Math.random() * randomNames.length)].concat(' ', randomAdjetives[Math.floor(Math.random() * randomAdjetives.length)]);
            commentAux.push(nameRelated.concat(' | ', comments.value));
            set(ref(db, "Places/" + plName), {
                address: vic,
                description: "",
                title: plName,
                type: 'building',
                rating: ratingAux,
                bathroom: bathroom.checked ? parseInt(bathroom.value) : 0,
                chargePoint: charge.checked ? parseInt(charge.value) : 0,
                accessibleEntrance: entrance.checked ? parseInt(entrance.value) : 0,
                comments: commentAux,
                position: locations,
                visibility: 0,
                fullPlaceName: fullPlaceName.value
            })
                .then(() => {
                    alert("Data stored successfully!");
                })
                .catch((error) => {
                    alert("Unsuccessful, error: " + error);
                });
        }
    }).catch((error) => {
        console.error(error);
    });
}
insBtn.addEventListener('click', InserData);

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

function SelectData() {
    const dbRef = ref(db, "Places");
    onValue(
        dbRef,
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log(childData.address, childData.description, childData.title, childData.rating, childData.bathroom, childData.chargePoint, childData.accessibleEntrance, childData.comments, childData.position, childData.visibility, childData.fullPlaceName);
            });
        },
        {
            onlyOnce: true,
        }
    );
}
//selBtn.addEventListener('click', SelectData);

var currentUrl = window.location.href;
currentUrl = currentUrl.replace('/markerPage/index.html', '');

selBtn.addEventListener('click', () => {
    const newPath = '/mainPage/index.html';
    const newUrl = `${currentUrl}${newPath}`;
    window.location.href = newUrl;
});
