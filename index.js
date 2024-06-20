const express = require('express');
const port = 9000;

const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.urlencoded({extended:false}));    // so that we can collect form data and store it in req.body 
app.use(express.static("./assets"));
app.set('view engine','ejs');  //set up the view engine
app.set('views','./views');    // specify a folder to look for the views.

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log('Error in starting the server ',err);
        return;
    }
    else{
        console.log('Server is running successfully at port no : ',port);
    }
})