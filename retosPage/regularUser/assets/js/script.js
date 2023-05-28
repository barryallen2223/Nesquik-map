const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
//const openModalBtn = document.querySelector(".btn-open");
//const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
//closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// open modal function
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
// open modal event
//openModalBtn.addEventListener("click", openModal);

window.addEventListener('load', function () {
    localStorage.setItem('actualChallInd', 0);
    const userName = localStorage.getItem('userName');
    const h3Element = document.querySelector('.userName');
    const msg = document.querySelector('.welcomeMsg');
    const placesList = document.getElementById("placesList");
    const places = JSON.parse(localStorage.getItem('CTF'));
    const getCurrentChall = localStorage.getItem('currentChallengeAccepted');
    const points = localStorage.getItem('pointsPerChallenge');

    const placesKeys = Object.keys(places);
    placesKeys.forEach(place => {
        const option = document.createElement("option");
        option.value = place;
        option.text = place;
        placesList.appendChild(option);
    });

    h3Element.textContent = userName;
    msg.textContent += userName + "!";
    var data = JSON.parse(localStorage.getItem('userData'));

    document.getElementById('pointsShow').innerHTML = data['pointsPerChallenge'] + " pts";
    if (data['currentChallenge'] == 'null' && getCurrentChall == 'null') {
        openModal();
    } else if (getCurrentChall == 'null' || getCurrentChall == null) {
        openModal();
    }
    else if (getCurrentChall != 'null') {
        closeModal();
    }
});

var state = 'start';

const startBtn = document.getElementById('startCapture');
const calcelBtn = document.getElementById('cancelCapture');
const updateBtn = document.getElementById('updateCapture');

updateBtn.addEventListener('click', () => {
    var currInd = parseInt(localStorage.getItem('actualChallInd'));
    //console.log(currInd);
    var element = document.querySelector('h3.welcomeMsg#trackTitle');
    var currentText = element.textContent;
    var regex = /(\d+)$/;
    var matches = regex.exec(currentText);

    if (matches) {
        var currentNumber = matches[0];
        var newNumber = currInd;
        var newText = currentText.replace(regex, newNumber);
        element.textContent = newText;
    }

});

function validatePosition(pointLat, pointLng) {
    // Define the coordinates of the point you want to check against
    /* const pointLat = 6.375007; // latitude of the point
    const pointLng = -75.443053; // longitude of the point */
    //6.375007, -75.443053
    //6.374708, -75.443681

    // Get the current position of the user
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position, options) => {
            // Extract the latitude and longitude coordinates of the user's position
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            console.log(userLat, userLng);
            // Calculate the distance between the user's position and the defined point using the Haversine formula
            const earthRadius = 6371; // radius of the earth in kilometers
            const latDiff = (pointLat - userLat) * (Math.PI / 180); // convert degrees to radians
            const lngDiff = (pointLng - userLng) * (Math.PI / 180);
            const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(userLat * (Math.PI / 180)) * Math.cos(pointLat * (Math.PI / 180)) *
                Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = earthRadius * c * 1000; // convert to meters

            // Check if the distance is less than or equal to 50 meters
            if (distance <= 50) {
                alert("Si");
                //console.log("The user is within 50 meters of the defined point");
            } else {
                alert("No xd")
                //console.log("The user is not within 50 meters of the defined point");
            }
        }, (error) => {
            // Handle any errors that occur when getting the user's location
            console.error(error);
        });
    }
}

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 6.2476, lng: -75.5658 },
        mapId: '122c8cd93cebd911',
        disableDefaultUI: true, // a way to quickly hide all controls
        streetViewControl: false,
        mapTypeControl: false
    });

    directionsRenderer.setMap(map);
    document.getElementById("startCapture").addEventListener("click", () => {
        document.querySelector('.startChall').style.display = 'none';
        document.querySelector('.cancelChall').style.display = 'flex';
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
    document.getElementById("cancelCapture").addEventListener("click", () => {
        document.querySelector('.startChall').style.display = 'flex';
        document.querySelector('.cancelChall').style.display = 'none';
    });
}
let list = [];
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [], opts = [];
    var placeArray = [];
    /* startBtn.addEventListener('click', () => {
    }); */

    /* */

    var places = JSON.parse(localStorage.getItem('CTF'));

    var data = JSON.parse(localStorage.getItem('userData'));
    //var challName = 'Reto POR FAVOR';
    //var challName = data['currentChalllenge'];

    var challName = localStorage.getItem('currentChallengeAccepted');
    document.getElementById('titleChall').innerHTML = challName;
    placeArray = Object.keys(places[challName].places);
    //console.log(places[challName].places);
    var auxPlace = places[challName].places;
    const newPlaceArray = placeArray.map(place => {
        const placeDetails = auxPlace[place];
        const placeName = place;
        const placeVicinity = placeDetails ? placeDetails.vicinity : '';
        return placeName + ', ' + placeVicinity;
    });
    //console.log(newPlaceArray);

    const n = newPlaceArray.length;
    const startPlaces = newPlaceArray.slice(0, 1);
    const endPlaces = newPlaceArray.slice(n - 1, n);
    const middlePlaces = newPlaceArray.slice(1, n - 1);
    //console.log(startPlaces, middlePlaces, endPlaces);

    var numMiddle = Math.floor(Math.random() * middlePlaces.length) + 1;


    if (numMiddle == 1) {
        numMiddle += 1;
    }
    const checkboxArray = document.getElementById("waypoints");

    // Fill control array 
    for (let i = 0; i < middlePlaces.length; i++) {
        opts[i] = i;
    }
    // Calculate random indexes
    var indexes = [];
    let i = 0
    while (i != numMiddle) {
        let randomPlace = Math.floor(Math.random() * opts.length);
        if (!indexes.includes(randomPlace)) {
            indexes.push(randomPlace);
            i++;
        }
    }
    // fill waypoints with the random indexes
    for (let i = 0; i < indexes.length; i++) {
        let placeInd = indexes[i];
        waypts.push({
            location: middlePlaces[placeInd],
            stopover: true,
        });
    }

    /* else {
        waypts.push({
            location: middlePlaces[0],
            stopover: true
        })
    } */
    //console.log(waypts);
    directionsService
        .route({
            origin: startPlaces[Math.floor(Math.random() * startPlaces.length)],
            destination: endPlaces[Math.floor(Math.random() * endPlaces.length)],
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);

            const route = response.routes[0];
            const summaryPanel = document.getElementById("directions-panel");

            summaryPanel.innerHTML = "";

            // For each route, display summary information.
            for (let i = 0; i < route.legs.length; i++) {
                var onlyVicStart = (route.legs[i].start_address).split(',', 2);
                var onlyVicEnd = (route.legs[i].end_address).split(',', 2);
                const routeSegment = i + 1;
                list.push(onlyVicStart + '|' + onlyVicEnd);
                summaryPanel.innerHTML +=
                    "<span class='nroTramo'>Tramo # " + routeSegment + "</span><br>";
                summaryPanel.innerHTML += "Desde <span class='firstOne'>" + onlyVicStart + "</span> hacia ";
                summaryPanel.innerHTML += "<span class='secondOne'>" + onlyVicEnd + "</span><br>";
                summaryPanel.innerHTML += "<span class='dst'>Distancia: </span>" + route.legs[i].distance.text + "<br><br>";
            }
            localStorage.setItem('placesListChallenge', JSON.stringify(list));
        })
        .catch((e) => window.alert("Directions request failed due to " + e));
}


//updateBtn.addEventListener('click', validatePosition(6.2529, -75.5646));

window.initMap = initMap;