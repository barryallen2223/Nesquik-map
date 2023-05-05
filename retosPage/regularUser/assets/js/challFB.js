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
const goBack = document.getElementById('goBack');
const accept = document.querySelector('.btnAccept');
var userPoints = document.querySelector('userPoints span');


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

function PlacesDBToJSON() {
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

startChall.addEventListener('click', () => {
    DBToJSON().then((infoDB) => {
        localStorage.setItem('CTF', JSON.stringify(infoDB));
    }).catch((error) => {
        console.error(error);
    });
});

var currentUrl = window.location.href;
currentUrl = currentUrl.replace('/retosPage/regularUser/index.html', '');

goBack.addEventListener('click', () => {
    const newPath = '/mainPage/index.html';
    const newUrl = `${currentUrl}${newPath}`;
    window.location.href = newUrl;
});

accept.addEventListener('click', () => {
    const placeValue = document.getElementById('placesList');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');

    // Modify the currentChallenge
    const dbRef = ref(db, "Users");
    onValue(
        dbRef,
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();

                if (userName == childData.name && userEmail == childData.email) {
                    var data = childData.data;
                    data.currentChallenge = placeValue.value;
                    localStorage.setItem('currentChallengeAccepted', placeValue.value);
                    console.log(placeValue.value);
                    //console.log(childKey, childData);

                    update(ref(db, "Users/" + childKey), {
                        data: data,
                    })
                        .then(() => {
                            console.log("Data updated successfully!");
                            //alert("Data updated successfully!");
                        })
                        .catch((error) => {
                            console.log("Unsuccessful, error: " + error);
                            localStorage.setItem('currentChallengeAccepted', 'null');
                            //alert("Unsuccessful, error: " + error);
                        });
                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});