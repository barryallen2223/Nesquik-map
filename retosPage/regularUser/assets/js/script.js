var state = 'start';

const startBtn = document.getElementById('startCapture');

/* var startPlaces = ["Planetario de Medellín Jesús Emilio Ramírez, Carrera 52, Aranjuez, Medellin, Antioquia", "Parque Explora, Carrera 52, Aranjuez, Medellin, Antioquia", "Parque Norte, Carrera 53, Aranjuez, Medellin, Antioquia"];
var middlePlaces = ["Universidad de Antioquia, Calle 67, Aranjuez, Medellin, Antioquia", "EAFIT, Calle 7 Sur, El Poblado, Medellin, Antioquia", "Universidad de Medellín, Carrera 87, Medellin, Antioquia"];
var endPlaces = ["Perficient, Carrera 42A, La Esmeralda, Itagüí, Antioquia", "Globant - One Plaza - Medellin, El Poblado, Medellin, Antioquia", "Mercado Libre Centro IT, Calle 10, El Poblado, Medellin, Antioquia"]; */

function clockStart() {
    let hour = 0, minutes = 0, seconds = 10;
    let strH = "", strM = "", strS = "";
    var timeRemaining = setInterval(function () {
        if (state == 'start') {
            // ...
            if (hour > 0 && minutes == 0) {
                hour--;
                minutes = 59;
            }
            if (minutes > 0 && seconds == 0) {
                minutes--;
                seconds = 59;
            }
            if (seconds > 0) {
                seconds--;
            }
            if (hour == 0 && minutes == 0 && seconds == 0) {
                //document.getElementById("status").innerHTML = "Se acabo el tiempo!";
                clearInterval(timeRemaining);
            }
            if (hour < 10) {
                strH = "0" + hour;
            }
            if (minutes < 10) {
                strM = "0" + minutes;
            }
            if (seconds < 10) {
                strS = "0" + seconds;
            }
            //document.getElementById("demo").innerHTML = strH + ":" + strM + ":" + strS;
            //console.log("h: ", hour, "m: ", minutes, "s: ", seconds);
        }
        if (state == 'reset') {
            //document.getElementById("demo").innerHTML = strH + ":" + strM + ":" + strS;
            clearInterval(timeRemaining);
            state = 'start';
        }
    }, 1000);
}
function pauseClock() {
    state = 'pause';
}
function resetClock() {
    state = 'reset';
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

window.initMap = initMap;