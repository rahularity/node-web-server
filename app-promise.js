const yargs = require('yargs');
const axios = require('axios');

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

var address = encodeURIComponent(argv.address);
var encodedUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(encodedUrl).then((response) => {

  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }

  console.log(response.data.results[0].formatted_address);
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  return axios.get(`https://api.darksky.net/forecast/f46a3850fb851974ac57461b6313f1e1/${lat},${lng}`);
}).then((response) => {
  var temperature =  response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var humidity = response.data.currently.humidity;
  var icon = response.data.currently.icon;
  console.log(`It's seems like ${icon}\nTemperature is currently ${temperature} but it's feels like ${apparentTemperature}\nHumidity is ${humidity}`);
}).catch((error) => {
  if(error.code === 'ENOTFOUND'){
    console.log('unable to connect to api servers');
  }else if (error.code === 'ENOENT') {
    console.log('not connnected to the internet');
  }else {
    console.log(error);
  }

});
