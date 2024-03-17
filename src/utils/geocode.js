
const request = require('request');
const API = process.env.API;
const geocode = (location, callback) => {
  const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API}`;

  request({ url: geoCodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to server", undefined);
    } 
    else if (response.body[0] == null) {
      callback("Input error", undefined);
    } 
    else {
    const content = response.body[0];
    const details = {
        lat: content.lat,
        lon: content.lon
    }
      callback(undefined, details);
    }
  });
}

module.exports = geocode;