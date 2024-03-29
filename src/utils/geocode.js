const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGxmcyIsImEiOiJjazJlbTZudmUwM3dxM21sbW04eXFrdnE1In0.y7VCC1H73G_zX768YCoIGw&limit=1';
    request({url, json : true}, (error, {body}) => {
        if(error) {
            callback('Unable to access the geocode service', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;