const request = require('request');
const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/cf33802877f519390f8a2277e65ebc78/'+longitude+','+latitude+'?units=si';
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error){
            callback('Unable to find the location.',undefined);
        } else {
            //console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            + ' Days High: ' + body.daily.data[0].temperatureHigh
            + ' .Days Low: ' + body.daily.data[0].temperatureLow);
        }
    });
}

module.exports = forecast;