var mongoose = require('mongoose'),
    user = require('../models/User'),
//category = require('../models/Category'),
    product = require('../models/Product'),
    purchase = require('../models/Purchase'),
    review = require('../models/Review');

function config(envConfig){
    var dbLocation = envConfig.db;
    mongoose.connect(dbLocation);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err){
            console.log('Could not connect to database: ' + err.toString());
            return;
        }

        console.log('Database up and running on ' + dbLocation);
    });

    db.on('error', function(err){
        console.log(err);
    });

    user.seed();
    product.seed();
    //category.seed();
    purchase.seed();
    review.seed();
};

module.exports = config;