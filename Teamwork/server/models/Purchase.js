var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseSchema = mongoose.Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    product: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    user: String,
    purchaseDate: Date,
    paid: Boolean,
    paymentMethod: {type: String},
    paymentDetails: {type: Object},
    shipDate: Date,
    shipped: Boolean
});

var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports.seed = function() {
    Purchase.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }
//product, user, purchaseDate, paid, paymentMethod, paymentDetails, shipDate, shipped
        if (collection.length === 0) {
            Purchase.create({
                product: 'Jeans',
                user: 'user',
                purchaseDate: new Date(),
                paid: false,
                paymentMethod: 'creditCard',
                paymentDetails: {cardNumber: '1234567890123'},
                shipDate: new Date(),
                shipped: false
            });
            Purchase.create({
                product: 'Sweater',
                user: 'user',
                purchaseDate: new Date(),
                paid: true,
                paymentMethod: 'paymentOrder',
                paymentDetails: {paymentOrderNumber: '1234567890123'},
                shipDate: new Date(),
                shipped: true
            });
            console.log('Purchases seeded.');
        }
    });
};