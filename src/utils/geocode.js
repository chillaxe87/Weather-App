const request = require('request')

const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiZGVucHJvODciLCJhIjoiY2tqaGlta2U0M2VjcjJxcnUweG5rc2xpZyJ9.DIe-WD_UcbcyhmrNxm4Dbg&limit=1`
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback("Unable to connect to location services!", undefined)
        } else if (body.features.length === 0) {
            callback( "No place found", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

