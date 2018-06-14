var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts')

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);

// GET /bikes - returns all bikes
app.get('/bikes', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    res.json(bikes);
})

// GET /bikes/new - returns a form to get info about new bike
app.get('/bikes/new', function(req,res) {
    // USING POSTMAN FOR NOW
})

// POST /bikes - add new bike to data.json
app.post('/bikes', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    bikes.push({brand: req.body.brand, model: req.body.model})
    fs.writeFileSync('./data.json', JSON.stringify(bikes));
    res.json(bikes);
})


// GET /bikes/:bike - show a specific bike
app.get('/bikes/:bike', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.model;
    if (bike > bikes.length) {
        console.log('That is not a valid bike model to show');
        res.send('That is not a valid bike model to show');
    } else {
        res.json({bike: bikes[bike]});
    }
})

// PUT /bikes/:bike - update a specific bike
app.put('/bikes/:bike', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.bike;
    if (bike > bikes.length) {
        console.log('That is not a valid bike model to update');
        res.send('That is not a valid bike model to update');
    } else {
        bikes[bike] = {brand: req.body.brand, model: req.body.model};
        fs.writeFileSync('./data.json', JSON.stringify(bikes) );
        res.json(bikes);
    }
})

// DELETE /bikes/:bike
app.delete('/bikes/:bike', function(req,res) {
    var bikes = JSON.parse(fs.readFileSync('./data.json'));
    var bike = req.params.bike;
    if (bike > bikes.length) {
        console.log('You cannot delete that which was never there...');
        res.send('You cannot delete that which was never there...');
    } else {
        bikes.splice(bike,1);
        console.log(bikes);
        fs.writeFileSync('./data.json', JSON.stringify(bikes));
        res.json(bikes);
    }
});

app.listen(3000, function() {
    console.log('server running at 3000');
})


