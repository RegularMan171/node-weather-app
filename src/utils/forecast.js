const request = require('postman-request');
const config = require('../config');

const forecast = (latitude, longitude, callback) => {
    const url = config.weatherStackUrl(latitude, longitude);
    request({url, json: true}, (error, response) => {
        if(error) {
            callback('cannot connect to weather service', undefined);
        } else if (response.body.error) {
            callback('could not find the location', undefined);
        } else {
            callback(undefined, "It's "+response.body.current.weather_descriptions+' outside. The temparature is '+response.body.current.temperature+". But it feels like "+response.body.current.feelslike+". The percentage of the occurance of rain: "+response.body.current.precip);
        }
    })
}

module.exports = forecast;