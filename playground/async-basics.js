console.log('Starting app');

setTimeout(function () {
console.log('inside the timeout function');
}, 3000);

setTimeout(() => {
  console.log('zero milliseconds result');
},0);

console.log('Finishing Up');
