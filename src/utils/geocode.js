const request = require('postman-request');
const config = require('../config');

const geocode = (address, callback) => {
    const url = config.mapboxUrl(encodeURIComponent(address));

    request({url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length===0) {
            callback('Unable to find location, Try again', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode;