//var mongoose = require('mongoose');
//
//var categorySchema = mongoose.Schema({
//    description: String
//});
//
//var Category = mongoose.model('Category', categorySchema);
//
//module.exports.seed = function() {
//    Category.find({}).exec(function(err, collection) {
//        if (err) {
//            console.log('Cannot find products: ' + err);
//            return;
//        }
//
//        if (collection.length === 0) {
//            Category.create({description: 'category 1'});
//            Category.create({description: 'category 2'});
//            Category.create({description: 'category 3'});
//        }
//    });
//};