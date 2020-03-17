const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for Express config
const  publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Tejj Jain'
    })
})


app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About",
        name: "Tejj Jain"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help",
        name: "Tejj Jain"
    })
})

app.get('/weather',(req, res)=>{
    console.log(req.query.address)
    var address = req.query.address
    if(!req.query.address){
        res.send("you must provide an address!")
    }
    else{
        geocode (req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                    return res.send({error: error})
            }
            else{
                forecast(latitude, longitude,(error, forecastData) => {
                        if(error){
                                return res.send({error: error})
                        }else{
                                res.send({
                                    location: location,
                                    forecastData: forecastData,
                                    address: address})
                        }        
                
                })
            }
            
    })  
    }
})


app.get('*', (req, res)=>{
    res.render('error',{
        title: "Error",
        name: "Tejj Jain"
    })
})




app.listen(3000, ()=>{
    console.log("Server is working on port 3000")
})



// https://daneden.github.io/animate.css/
// to make it animated


// github Heroku 8209859515@july

// https://www.c-sharpcorner.com/article/crud-operation-in-angular-7-using-web-api/