const request = require('request')

const forecast =(latitude,longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/6f788a50d35ead285eaf74a2dd238518/'+latitude+','+longitude+'?units=si'
    request({url, json: true}, (error, {body})=>{
    if(error){
            callback("Unable to connect to location services!", undefined)
        }else if(body.error === 0){
            callback("No match found, Please try again!", undefined)
        }else {
            callback(undefined, body.daily.data[0].summary+" It is currently "+body.currently.temperature+ " degrees out. There is a "+body.currently.precipProbability+"% chance of rain.")
            }
        })
}

module.exports = forecast