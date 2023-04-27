var state = 'start';

const startBtn = document.getElementById('startCapture');
const updateBtn = document.getElementById('updateCapture');

function validatePosition(pointLat, pointLng) {
    // Define the coordinates of the point you want to check against
    /* const pointLat = 6.375007; // latitude of the point
    const pointLng = -75.443053; // longitude of the point */
    //6.375007, -75.443053
    //6.374708, -75.443681

    // Get the current position of the user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
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
                console.log("Enhorabuena tio!!!");
                //console.log("The user is within 50 meters of the defined point");
            } else {
                console.log("Qbo gonorrea, usted no esta donde le dije, mueva esa silla pirobito")
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
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [], opts = [];
    var placeArray = [];
    /* startBtn.addEventListener('click', () => {
    }); */

    /* */

    var places = JSON.parse(localStorage.getItem('CTF'));
    var challName = 'Reto POR FAVOR';
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

                summaryPanel.innerHTML +=
                    "<span class='nroTramo'>Tramo # " + routeSegment + "</span><br>";
                summaryPanel.innerHTML += "Desde <span class='firstOne'>" + onlyVicStart + "</span> hacia ";
                summaryPanel.innerHTML += "<span class='secondOne'>" + onlyVicEnd + "</span><br>";
                summaryPanel.innerHTML += "<span class='dst'>Distancia: </span>" + route.legs[i].distance.text + "<br><br>";
            }
        })
        .catch((e) => window.alert("Directions request failed due to " + e));
}


//updateBtn.addEventListener('click', validatePosition());

window.initMap = initMap;