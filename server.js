const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();  //creating an app with express all we have to do is this.

//'partial' is a partial piece of your website, it is something you want to use at every page of your website without coding it to each and every page(such as headers and footers)
hbs.registerPartials(__dirname + '/views/partials'); //registering partials directory that we gonna use in our app as partial
app.set('view engine' , 'hbs');  //it is all we need to do to setup hbs with express
app.use(express.static(__dirname + '/public')); //using some static folder for viewing onto the server (in here the folder is public)
                                                //now we can access the files inside the directory
                                                //app.use()  ,this is how we register middleware

app.use((req,res,next) => {
  var log = `time ${new Date().toString()}: ${req.method} ${req.url}\n`;
  fs.appendFile('server.log',log, (err) => {
    if (err) {
      console.log("unable to append to server.log.");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


app.get('/',(req,res) => {      //making the home(localhost:3000) to request and respond
  // res.send({
  //   name: 'Rahul Pandey',
  //   age: 21,
  //   taste: 'no no no',
  //   likes: [
  //     'cricket',
  //     'tennis',
  //     'coding',
  //     'competitive programming'
  //   ]
  // });

  res.render('home.hbs',{      //rendering home.hbs file to view on the server
    Title: 'Home Page',        //things(Title,subTitle,currentYear) on the file(home.hbs) for dynamic changing without changing in the file itself
    subTitle: 'i am calling this part as subheading of this page',
    currentYear: new Date().getFullYear()
  });
});


app.get('/about', (req,res) => {    //making the about page(localhost:3000/about) to request and respond
  res.render('about.hbs',{          //rendering about.hbs file to view to the server
    Title: 'About Page',
    subTitle: 'this website is all about unknown stuffs as i am writing about page crazy',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to fullfill this request'
  });
})

app.listen(port, () =>{     // listening to the app on the local host port 3000
  console.log(`starting at port ${port}`);
});
