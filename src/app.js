require('dotenv').config();


const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname) // current directory path
// console.log(__filename) // current file path
// modify the path using core mdule path
const publicDirectoryPath = path.join(__dirname, '../public');
//to have dynamic web pages we use template engines like handlebars and we have express plugin of handlebars
// that is hbs npm package 
// default place for views (hbs) file is the package searches the views directory in src directory 
app.set('view engine', 'hbs')
// but we can change the path of the views
// we can even change the name of views
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');
// console.log(viewsDirectoryPath);
// to set this directory path we use app.set
//app.set((new views directory name),new path)
app.set('views', viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsDirectoryPath)
//to serve the static files argument passed has to be absolute path
//index.html has special meaning it will directly connect to home page but not with other files
// to set this template engine we use app.set function make sure u write it in correct case coz it is case sensitive
//app.set('view engine',''handlebare name')
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rishidha Addanki'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: ' About ',
    name: 'Rishidha Addanki'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: '  Help ',
    name: 'Rishidha Addanki'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.render('error', {
      message: "You must provide a address"
    }
    )
  }
  const location = req.query.address
  geocode(location, (error, data) => {
    if (error) {
      return res.send({
        message: error
      }
      )
    }
    const lat = data.lat;
    const lon = data.lon;
    forecast(lat, lon, (error, data) => {
      if (error) {
        return res.send({
          message: error
        }
        )
      }
      res.send({
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        wind_speed: data.wind.speed,
        location: data.name,
        maximum: data.main.temp_max,
        minimum: data.main.temp_min,
        forecast: data.weather[0].description
      })
    }
    )
  }
  )
})
app.get('/help/*', (req, res) => {
  res.render("error", {
    title: '  404 ',
    name: 'Rishidha Addanki',
    message: 'Help article not found'
  })
})
app.get('*', (req, res) => {
  res.render("error", {
    title: '404',
    name: 'Rishidha Addanki',
    message: 'Page Not Found'
  })
})
app.listen(3000)