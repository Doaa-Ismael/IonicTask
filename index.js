// App Setup
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



// Configure MongoDb
mongoose.connect('mongodb://doaa:accounts0@ds127851.mlab.com:27851/accounts');
let db = mongoose.connection;

// Model
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    number: String, 
    totalBills: Number,
    totalServices: Number
});

let Accoount = mongoose.model('Account', accountSchema);


db.once('open', () => {
/*
    let accounts = [ 
        {number: '35000041120', totalBills: 2952.23, totalServices: 8},
        {number: '35001161863', totalBills: 4693.72, totalServices: 15},
        {number: '5058349412', totalBills: 23084.11, totalServices: 6},
        {number: '35001008070', totalBills: 0.0, totalServices: 2},
        {number: '35000338190', totalBills: 52454.07, totalServices: 36},
        {number: '35124587930', totalBills: 2952.20, totalServices: 8},
        {number: '45896321587', totalBills: 2952.41, totalServices: 1},
        {number: '12036547895', totalBills: 2354.784, totalServices: 2},
        {number: '01236547895', totalBills: 1452.48, totalServices: 78},
        {number: '78549256320', totalBills: 7852.45, totalServices: 4},
        {number: '20000365478', totalBills: 1452.785, totalServices: 0},
        {number: '14578902354', totalBills: 0.45, totalServices: 78},
        {number: '35000041120', totalBills: 0.0, totalServices: 10},
        {number: '77788559624', totalBills: 1000.201, totalServices: 42}
    ];
    Accoount.collection.insert(accounts);
*/
});

let app = express();

// Configure Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors()); // Enable Cross-Origin Resource Sharing


// Configure Routes

app.get('/accounts/all', (req, res) => {

    if(req.query == null || req.query.searchItem == null) 
    {
        Accoount.find({}, null , (err, data) => {
            if(err) {
                res.send({success: false, message: 'Error in retreiving accounts from database'});
            }
            else 
                res.json(data);
        });
    }
    else {
        Accoount.find({number: { $regex: '.*' + req.query.searchItem + '.*' } }, (err, data) => {
            if(err) {
                res.send({success: false, message: 'Error in retreiving accounts from database'});
            }
            else {
                res.json(data);
            }
        });
    }
});

app.get('**', (req, res) => {
    res.send("404 Not Found");
});
    

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
