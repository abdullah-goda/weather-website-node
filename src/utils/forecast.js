const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=737f6957399e349b099412ebc37daa06&&query='+longitude+','+latitude+'&units=s';
    //encodeURIcomponent helps in case of special charcters
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('Can not connect to weather service',undefined)
      }
      else if(response.body.error){
        console.log('Unable to find the weather for given co-ordinates');
      } else {
        const data ={
            condition: response.body.current.weather_descriptions[0],
            temperature: response.body.current.temperature
        };
        callback(undefined,data)
  
      
      }
  
    })

    
}


  
module.exports = forecast;