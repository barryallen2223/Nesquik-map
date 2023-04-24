
var plName, vic;

function searchBar() {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("placeName");
    const searchBox = new google.maps.places.SearchBox(input);

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        places.forEach((place) => {
            var xy = JSON.stringify(place.geometry.viewport).split(",");
            var lat = xy[0].split('{"south":');
            var lng = xy[1].split('"west":');
            localStorage.setItem('plName', place.name);
            localStorage.setItem('vic', place.vicinity);
            localStorage.setItem('lat', parseFloat(lat[1]));
            localStorage.setItem('lng', parseFloat(lng[1]));
        });
    });
}