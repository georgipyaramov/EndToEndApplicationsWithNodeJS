var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = mongoose.Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    //product: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    user: String,
    text: {type: String, maxLength: 300},
    date: Date
});

var Review = mongoose.model('Review', reviewSchema);

module.exports.seed = function() {
    Review.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }

        if (collection.length === 0) {
            Review.create({user: 'user', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit rhoncus enim et tincidunt. Aenean nunc libero, sollicitudin sit amet mauris mattis, cursus pulvinar mi.'});
            Review.create({user: 'user', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit rhoncus enim et tincidunt. Aenean nunc libero, sollicitudin sit amet mauris mattis, cursus pulvinar mi. Phasellus sit amet elit porta, porta urna id, vulputate leo. Sed a orci dolor. Praesent placerat finibus dolor.'});
            console.log('Reviews seeded.');
        }
    });
};