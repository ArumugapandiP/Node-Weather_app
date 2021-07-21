const request = require("request");

//without call back
// request({url: url, json:true}, (error, response)=>{
// // const data = JSON.parse(response.body);
// // const current = data.current;
// const current = response.body.current;
// // console.log(current)
// })


//implemented as callback
const weather = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=859c5e1b4719e0ecc3e511e86b0209dd&query='+lat+','+long;

    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to service',undefined)
        }
        else if(body.error){
            callback('unable to get weather',undefined);
        }
        else{
            callback(undefined, "Temperaturde is "+body.current.temperature + " "+ "But it feels like "+body.current.feelslike + " "+ "Humidity is "+body.current.humidity + " " + "Last Observed Time: "+ body.current.observation_time)
        }
    })
}

module.exports = weather;