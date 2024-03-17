console.log('client side app.js');

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const errorMessage = document.querySelector('#error');
  const place = document.querySelector('#place');
  const forecast = document.querySelector('#fore');
  const temperature = document.querySelector('#temp');
  const windSpeed = document.querySelector('#windspeed');
  const location = document.querySelector('#location').value;

  fetch('https://weather-whizzz.onrender.com/weather?address=' + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.message) {
          place.innerHTML = '';
          temperature.innerHTML = '';
          windSpeed.innerHTML = '';
          forecast.innerHTML = '';
          errorMessage.innerHTML = 'Error in fetching weather data. Please enter the correct location.';
        }
        else {
          errorMessage.innerHTML = '';
          place.innerHTML = 'You are in ' + data.location + '.';
          temperature.innerHTML = 'It is ' + data.temperature + ' degrees out there, but it feels like ' + data.feels_like + ' degrees.';
          windSpeed.innerHTML = 'The wind speed is ' + data.wind_speed + ' meters per second.';
          forecast.innerHTML = 'The forecast for today is ' + data.forecast + '.';
        }
      }).catch((error) => {
        place.innerHTML = '';
        temperature.innerHTML = '';
        windSpeed.innerHTML = '';
        forecast.innerHTML = '';
        errorMessage.innerHTML = 'Error fetching weather data. Please enter the correct location.';
      });
    })
    .catch((error) => {
      console.error(error); // Log any fetch errors
      place.innerHTML = '';
      temperature.innerHTML = '';
      windSpeed.innerHTML = '';
      forecast.innerHTML = '';
      errorMessage.innerHTML = 'Error fetching weather data. Please try again later.';
    });
});
