var gimme = (a,b) => {

  return new Promise((resolve,reject) => {
    setTimeout(() =>{
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else {
        reject('this is not valid');
      }
    },1500);

  })

}

var gimmePromise = gimme(12,6);
gimmePromise.then((f)=>{
  console.log(f);
  return gimme(f,21);   //Chaining the promise
}).then((res) => {    //This is promise chaining => this handles the results of the chained promise
  console.log(res);
}).catch((errorMsg) =>{
  console.log(errorMsg);
});



// var somePromise = new Promise((resolve, reject) => {
//
//   setTimeout(function () {
//     resolve('hey, It worked!');
//     reject('unable to fullfill promise');
//   }, 2500);
//
// });
//
// somePromise.then((message) => {
//   console.log('success' , message);
// }, (errorMessage)=>{
//   console.log('Error' , errorMessage);
// });
