const request = require('postman-request');

const weatherAPIKEY = "e60a0818f7a5907056771e3f9f9a7985";

// const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherAPIKEY}&query=37.8267,-122.4233`;

const forecast = (longitude, latitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + weatherAPIKEY + '&query=' + latitude + ',' + longitude;

    request(
        {url: weatherUrl, json: true}, (error, response) => {
            if (error) {
                callback('Unable to connect to weather service', undefined);
            } else if (response.body.error) {
                callback('Unable to find location', undefined);
            } else {
                callback(undefined, response.body.current );
            }
        }
    );
}

module.exports = forecast;