const path  = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Name"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Not my name"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: "Help is coming"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    });
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name:'Help Error Person',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Error Person',
        errorMessage: 'Page not found'
    });
});


app.listen(port, () => {
    console.log("server is running on "+port)
})
