const request = require("request");

const geoCode = (address, callBack)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJ1bXVnYW05NiIsImEiOiJjazQ5ZDFjMmgwM3M4M29va2VkejR4aXVhIn0.oiT8iQvTAtlk1-IUilnnhQ'

    request ({url:url, json: true},(error, {body})=>{
        if(error){
            callBack('unable to connect to location service',undefined)
        }
        else if(body.features.length == 0){
            callBack('unable to find location, Try another search',undefined)
        }else{
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;