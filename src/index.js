const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Denis'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Denis'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Get some help',
        name: 'Denis'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return req.send({
            error: "No address provided"
        })
    }
    if(!req.query.address){
        return res.send("place not found")
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {
            return res.send({error})
        }  
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                console.log({error})
            } else{
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            }
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "Search required"
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help article not found",
        name: "Denis"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        name: "Denis"
    })
})

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`)
})