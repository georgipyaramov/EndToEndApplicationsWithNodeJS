var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs');

var productSchema = mongoose.Schema({
    categories: [String], //one product may be in several categories
    count: {type: Number, min: 0, required: true},
    name: {type: String, required: true},
    description: {type: String, maxLength: 300},
    picture: {type: String},
    price: Number,
    shipDuration: Number
});

var Product = mongoose.model('Product', productSchema);

module.exports.seed = function() {
    Product.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }
        var imgDir = __dirname + '/../../images';
        if (collection.length === 0) {
            Product.create({
                _id: '507f1f77bcf86cd799439011',
                picture: '507f1f77bcf86cd799439011.jpg',
                name: 'Black and white blazer',
                description: 'Description some description',
                price: 10.3,
                count: 10,
                categories: ['casual', 'sport']
            });
            Product.create({
                _id: '507f1f77bcf86cd799439012',
                picture: '507f1f77bcf86cd799439012.jpg',
                name: 'Skinny Jeans',
                description: 'Description some description',
                price: 10.3, count: 10,
                categories: ['winter', 'sport']
            });
            Product.create({
                _id: '507f1f77bcf86cd799439013',
                picture: '507f1f77bcf86cd799439013.jpg',
                name: 'Ripped Jeans',
                description: 'Description some description',
                price: 10.7,
                count: 10,
                categories: ['summer', 'basic']
            });
            Product.create({
                _id: '507f1f77bcf86cd799439014',
                picture: '507f1f77bcf86cd799439014.jpg',
                name: 'White skirt',
                description: 'Description some description',
                price: 10.9,
                count: 10,
                categories: ['basic', 'casual']
            });
            Product.create({
                _id: '507f1f77bcf86cd799439015',
                picture: '507f1f77bcf86cd799439015.jpg',
                name: 'Skinny trousers',
                description: 'None',
                price: 10.3,
                count: 10,
                categories: ['winter']
            });
            console.log('Products seeded.');
        }
    });
};
