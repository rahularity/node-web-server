const request = require('request');

var geocodeAddress = (address) => {

  return new Promise((resolve,reject) => {
    var add = encodeURIComponent(address);
    request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${add}`,
      json: true
    },(error, response, body) => {

      if(error){
          reject('no active internet connection');
      }else if (body.status === 'ZERO_RESULTS') {
        reject('you have typed a wrong address');
      }else{
        resolve ({
          Address: body.results[0].formatted_address,
          Latitude: body.results[0].geometry.location.lat,
          Longitude: body.results[0].geometry.location.lng
        })
      }

    })
  })
};

geocodeAddress('110080').then((res) => {
  console.log(JSON.stringify(res,undefined,2));
},(errorMsg) => {
  console.log(errorMessage);
});
