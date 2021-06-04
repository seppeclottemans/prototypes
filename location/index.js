// source: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
let latitude = 0;
let longitude = 0;

(function () {
    geoFindMe();
})();

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);

        status.textContent = '';
        setMap();
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

// source: https://docs.mapbox.com/mapbox-gl-js/api/
function setMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VwcGVjIiwiYSI6ImNraHZyYjFxdTBodGwydm8yNjU1NXY0cHgifQ.h3-kkvjsMkTrjB701I-VCQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });


    // add marker and popup to your location
    var popup = new mapboxgl.Popup()
        .setText('you')
        .addTo(map);


    var marker = new mapboxgl.Marker({
            "color": "#b40219"
        })
        .setLngLat([longitude, latitude])
        .addTo(map)
        .setPopup(popup);

        
        addUsersToMap(map);

}

function addUsersToMap(map) {
    $.getJSON('db.json', function (users) {
        users.userLocations.forEach(user => {
            var popup = new mapboxgl.Popup()
                .setText(user.name);


            var marker = new mapboxgl.Marker()
                .setLngLat([user.longitude, user.latitude])
                .addTo(map)
                .setPopup(popup);
        });
    });
}