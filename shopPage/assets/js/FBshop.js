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

const markerBtn = document.getElementById('markerBtn');
const challengeBtn = document.getElementById('challengeBtn');
const home = document.getElementById('logoutBtn');
const rappiCoupon = document.getElementById('rappiCoupon');
const McCoupon = document.getElementById('McCoupon');
const subCoupon = document.getElementById('subCoupon');
const frisCoupon = document.getElementById('frisCoupon');
const falaCoupon = document.getElementById('falaCoupon');
const qbCoupon = document.getElementById('qbCoupon');

home.addEventListener('click', () => {
    window.location.href = window.location.href.replace("/shopPage/", "/mainPage/");
});
markerBtn.addEventListener('click', () => {
    window.location.href = window.location.href.replace("/shopPage/", "/markerPage/");
});
challengeBtn.addEventListener('click', () => {
    window.location.href = window.location.href.replace("/shopPage/", "/retosPage/regularUser/");
});


rappiCoupon.addEventListener('click', () => {
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
                    if (data.totalPoints >= 10000) {
                        data.totalPoints -= 10000;
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
                        /* var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; */
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var key = '';
                        var length = 10;
                        for (var i = 0; i < length; i++) {
                            var randomIndex = Math.floor(Math.random() * characters.length);
                            key += characters.charAt(randomIndex);
                        }
                        const h3Element = document.querySelector('.user-info h3');
                        const currentValue = parseInt(h3Element.textContent.replace(/[^\d]/g, ''));
                        const newValue = currentValue - 10000;
                        h3Element.textContent = userName + " - " + newValue + " pts";

                        var msg = 'Felicidades, disfruta de tu codigo: RAPPI' + key;
                        alert(msg);
                    } else {
                        alert("Ooops! Parece que aun no tienes suficientes puntos para este premio.")
                    }

                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});


McCoupon.addEventListener('click', () => {
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
                    if (data.totalPoints >= 5000) {
                        data.totalPoints -= 5000;
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
                        /* var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; */
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var key = '';
                        var length = 10;
                        for (var i = 0; i < length; i++) {
                            var randomIndex = Math.floor(Math.random() * characters.length);
                            key += characters.charAt(randomIndex);
                        }
                        const h3Element = document.querySelector('.user-info h3');
                        const currentValue = parseInt(h3Element.textContent.replace(/[^\d]/g, ''));
                        const newValue = currentValue - 5000;
                        h3Element.textContent = userName + " - " + newValue + " pts";

                        var msg = 'Felicidades, disfruta de tu codigo: RAPPI' + key;
                        alert(msg);
                    } else {
                        alert("Ooops! Parece que aun no tienes suficientes puntos para este premio.")
                    }

                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});


subCoupon.addEventListener('click', () => {
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
                    if (data.totalPoints >= 12000) {
                        data.totalPoints -= 12000;
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
                        /* var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; */
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var key = '';
                        var length = 10;
                        for (var i = 0; i < length; i++) {
                            var randomIndex = Math.floor(Math.random() * characters.length);
                            key += characters.charAt(randomIndex);
                        }
                        const h3Element = document.querySelector('.user-info h3');
                        const currentValue = parseInt(h3Element.textContent.replace(/[^\d]/g, ''));
                        const newValue = currentValue - 12000;
                        h3Element.textContent = userName + " - " + newValue + " pts";

                        var msg = 'Felicidades, disfruta de tu codigo: RAPPI' + key;
                        alert(msg);
                    } else {
                        alert("Ooops! Parece que aun no tienes suficientes puntos para este premio.")
                    }

                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});


frisCoupon.addEventListener('click', () => {
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
                    if (data.totalPoints >= 12000) {
                        data.totalPoints -= 12000;
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
                        /* var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; */
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var key = '';
                        var length = 10;
                        for (var i = 0; i < length; i++) {
                            var randomIndex = Math.floor(Math.random() * characters.length);
                            key += characters.charAt(randomIndex);
                        }
                        const h3Element = document.querySelector('.user-info h3');
                        const currentValue = parseInt(h3Element.textContent.replace(/[^\d]/g, ''));
                        const newValue = currentValue - 12000;
                        h3Element.textContent = userName + " - " + newValue + " pts";

                        var msg = 'Felicidades, disfruta de tu codigo: RAPPI' + key;
                        alert(msg);
                    } else {
                        alert("Ooops! Parece que aun no tienes suficientes puntos para este premio.")
                    }

                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});

falaCoupon.addEventListener('click', () => {
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
                    if (data.totalPoints >= 36000) {
                        data.totalPoints -= 36000;
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
                        /* var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; */
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var key = '';
                        var length = 10;
                        for (var i = 0; i < length; i++) {
                            var randomIndex = Math.floor(Math.random() * characters.length);
                            key += characters.charAt(randomIndex);
                        }
                        const h3Element = document.querySelector('.user-info h3');
                        const currentValue = parseInt(h3Element.textContent.replace(/[^\d]/g, ''));
                        const newValue = currentValue - 36000;
                        h3Element.textContent = userName + " - " + newValue + " pts";

                        var msg = 'Felicidades, disfruta de tu codigo: RAPPI' + key;
                        alert(msg);
                    } else {
                        alert("Ooops! Parece que aun no tienes suficientes puntos para este premio.")
                    }

                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});


qbCoupon.addEventListener('click', () => {
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
                    if (data.totalPoints >= 14000) {
                        data.totalPoints -= 14000;
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
                        /* var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; */
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var key = '';
                        var length = 10;
                        for (var i = 0; i < length; i++) {
                            var randomIndex = Math.floor(Math.random() * characters.length);
                            key += characters.charAt(randomIndex);
                        }
                        const h3Element = document.querySelector('.user-info h3');
                        const currentValue = parseInt(h3Element.textContent.replace(/[^\d]/g, ''));
                        const newValue = currentValue - 14000;
                        h3Element.textContent = userName + " - " + newValue + " pts";

                        var msg = 'Felicidades, disfruta de tu codigo: RAPPI' + key;
                        alert(msg);
                    } else {
                        alert("Ooops! Parece que aun no tienes suficientes puntos para este premio.")
                    }

                }
            });
        },
        {
            onlyOnce: true,
        }
    );
});