
const request = require('request');
const API =process.env.API;
const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API}`
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      return callback("Unable to connect to server", undefined)
    } else if (response.body.cod === '400') {
      return callback("Input error", undefined)
    } else {
      const content = response.body;
      return callback(undefined, content);
    }
  });
}

module.exports = forecast;