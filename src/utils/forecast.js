const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8d46d54370ab9a0c5a497cf27e278f07&query=${longitude},${latitude}`
    request ({ url, json: true}, (err, {body}) => {
        if(err){
            callback("Unable to connect to location services!", undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            callback(undefined, `${description}, It is currently ${temp} degrees out. It feels like ${feelsLike} degrees out`)
        }
    })
}

module.exports = forecast