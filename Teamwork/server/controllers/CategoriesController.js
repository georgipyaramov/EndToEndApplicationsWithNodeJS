//var Category = require('mongoose').model('Category');
////TODO: delete, update
//
//module.exports = {
//    createCategory: function(req, res, next) {
//        var newCategoryData = req.body;
//        Category.create(newCategoryData, function(err, category) {
//            if (err) {
//                console.log('Failed to create new category: ' + err);
//                return;
//            }
//
//            res.send(category);
//        });
//    },
//    getAllCategories: function(req, res, next) {
//        Category.find({}).exec(function(err, collection){
//            if (err) {
//                console.log('Categories could not be loaded: ' + err);
//            }
//
//            res.send(collection);
//        });
//    }
//}