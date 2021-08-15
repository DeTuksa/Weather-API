const request = require('postman-request');

const mapAPIKEY = "pk.eyJ1IjoiZHRlbW1pZSIsImEiOiJja3M5bXRiZHkxNmNyMm5vY3plaGxtZDJuIn0.KzL-VJivFnwrhcmHcO_QLA";

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapAPIKEY;

    request(
        {url: geocodeUrl, json: true}, (error, response) => {
            if (error) {
                callback('Unable to connect to location services', undefined)
            } else if(response.body.error) {
                callback('No internet connection', undefined)
            } else if (response.body.features.length == 0) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }
        }
    )
}

module.exports = geocode;