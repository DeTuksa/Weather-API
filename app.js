const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

const port = process.env.PORT || 3000

app.get('/weather', (req, res) => {
    if (req.query.location) {
        geocode(req.query.location, (error, {longitude, latitude, location} = {}) => {
            if (error) {
                res.send({
                    "success": false,
                    error
                })
            }
            forecast(longitude, latitude, (forecastError, forecastData) => {
                if (forecastError) {
                    res.send({
                        "success": false,
                        error: forecastError
                    })
                }
                res.send({
                    "success": true,
                    "location": location,
                    "longitude": longitude,
                    "latitude": latitude,
                    "temperature": forecastData.temperature,
                    "weather descriptions": forecastData.weather_descriptions[0]
                })
            });
        });
        
    } else {
        res.send({
            success: false,
            error: 'No location set'
        });
    }
})


app.listen(port, () => {
    console.log('Weather service running..........')
})