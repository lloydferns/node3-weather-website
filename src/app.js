const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(publicDirPath)

//define handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Lloyd Fernandes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Lloyd Fernandes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is some helpful text',
        title : 'Help page',
        name : 'Lloyd Ferandes'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
    
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Lloyd Fernandes',
        errorMessage : 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Lloyd Fernandes',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})