const request = require('request');


var weatherDetails = (lat,lng,callback)=>{
  request({
    url: `https://api.darksky.net/forecast/f46a3850fb851974ac57461b6313f1e1/${lat},${lng}`,
    json: true
  }, (error , response , body) => {
    if(error){
      callback('can\'t connect to the server');
    }else if (response.statusCode === 404) {
      callback(undefined,'unable to fetch weather');
    }else{
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        humidity: body.currently.humidity,
        icon: body.currently.icon
      });
    }
})
}
module.exports.weatherDetails = weatherDetails;
