
var getUser = (id , callback) => {
  var user = {
    id: id,
    name: 'Rahul Pandey'
  }
  callback(user);
};

getUser(31 , (userObject) => {
  console.log(userObject);
} );
