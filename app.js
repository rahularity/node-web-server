
const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

var argv = yargs
.options({
  a: {
    demand : true,
    string: true,
    describe: 'address of the location for weather',
    alias: 'address'
  }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.address , (errorMessage , results) => {
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(results.Address);
    weather.weatherDetails(results.Latitude,results.Longitude,(errorMessage , results) =>{
      if(errorMessage){
        console.log(errorMessage);
      }else {
        console.log(`It's seems like ${results.icon}\nTemperature is currently ${results.temperature} but it's feels like ${results.apparentTemperature}\nHumidity is ${results.humidity}`);
      }
    })
  }
});
