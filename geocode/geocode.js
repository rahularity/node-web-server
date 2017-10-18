const request = require('request');

module.exports = {
    geocodeAddress
}

function geocodeAddress(address, callback){
  var address = encodeURIComponent(address);
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  },(error, response, body) => {

    if(error){
        callback('no active internet connection');
    }else if (body.status === 'ZERO_RESULTS') {
      callback('you have typed a wrong address');
    }else{
      callback(undefined , {
        Address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longitude: body.results[0].geometry.location.lng
      })
    }

  })

}
