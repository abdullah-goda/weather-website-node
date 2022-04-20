const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJkdWxsYWgtZ29kYSIsImEiOiJjbDFpN2xwbDQwZ292M2ptamlxcDVlZm1wIn0.sThA2Nd9xR-7BaLqJoLI0Q';
    //encodeURIcomponent helps in case of special charcters
    request({url:url,json:true},(error,response)=>{      // Using #s7 shorthand for obj we can just say: url
      if(error){
        callback('Can not connect',undefined)
      }
      else if(response.body.features.length===0){
        console.log('Unable to find the co-ordinates');
        callback({error:'Unable to find location'},undefined)
        // return {error: 'Unable to find the co-ordinates'}
      } else {
        const data ={
          latitude : response.body.features[0].center[1],
          longitude : response.body.features[0].center[0],
          location : response.body.features[0].place_name 
        };
        callback(undefined,data)
  
      
      }
  
    })
  }

module.exports = geocode;