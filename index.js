var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts')

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

// GET /bikes - returns all bikes
app.get('/bikes', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    res.json(bikes);
})

// GET /bikes/new - returns a form to get info about new bike
app.get('/bikes/new', function(req,res) {

})

// POST /bikes - post new bike back to data.json


// GET /bike/:model 

app.listen(3000, function() {
    console.log('server running at 3000');
})


