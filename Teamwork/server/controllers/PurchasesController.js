var Purchase = require('mongoose').model('Purchase');
//TODO: only admin role to can: module.exports.update()

function isComposedOfDigits(cardNumber){
    var isnum = /^\d+$/.test(cardNumber);
    return isnum;
}

function validateCreditCard(cardNumber, securityCode){
    return typeof(cardNumber) == 'string' &&
        cardNumber.length == 12 &&
        isComposedOfDigits(cardNumber);
}

function validatePaymentOrder(orderNumber){
    return true;
}

function validatePaymentDetails(formBody, res){
//    var paymentMethod = formBody.paymentMethod;
//    if(paymentMethod === 'creditCard'){
//        var valid = validateCreditCard(formBody.creditCardNumber, formBody.securityCode);
//        if(!valid){
//            res.json({message: 'Invalid card number and/or security code!'});
//        }
//    } else if (paymentMethod === 'paymentOrder') {
//        var valid = validatePaymentOrder(formBody.paymentOrderNumber);
//        if(!valid){
//            res.json({message: 'Invalid payment order number!'});
//        }
//    }
}

function getPaymentDetails(formBody){
    var paymentMethod = formBody.paymentMethod;
    if(paymentMethod === 'creditCard'){
        return {
            cardNumber: formBody.creditCardNumber
        };
    } else if (paymentMethod === 'paymentOrder') {
        return {
            code: formBody.paymentOrderNumber
        };
    } else {
        // cash on delivery
        return {
        };
    }
};

module.exports = {
    createPurchase: function(req, res, next) {
        var newPurchaseData = req.body;
        newPurchaseData.purchaseDate = new Date();
        newPurchaseData.paid = false;
        newPurchaseData.shipped = false;
        validatePaymentDetails(req.body, res);
        newPurchaseData.paymentDetails = getPaymentDetails(req.body);
        newPurchaseData.user = req.user.username;
        console.log(newPurchaseData);
        Purchase.create(newPurchaseData, function(err, purchase) {
            if (err) {
                console.log('Error while creating purchase: ' + err);
                res.json(err);
                return;
            }

            res.json(purchase);
        });
    },
    getAllPurchasesForUser: function(req, res) {
        // /api/users/:id/purchases
        var username = req.user.username;
        Purchase.find({user : username}).exec(function(err, collection) {
            if (err) {
                console.log('Error while listing purchases: ' + err);
                res.json(err);
                return;
            }

            res.json(collection);
        });
    },
    getDetails: function(req, res){
        var id = req.params.id;
        Purchase.findOne({_id: req.params.id}).exec(function(err, obj){
            if (err) {
                console.log('Error while getting purchase: ' + err);
                res.json(err);
                return;
            }

            res.json(obj);
        });
    },
    update: function(req, res){
        // admin/:userId/purchases/:purchaseId
        var id = req.params['purchaseId'];
        //req.body = {shipped: true} AND/OR {paid: true}
        var update = req.body;
        Purchase.findOneAndUpdate({_id: id}, {paid: true}).exec(function(err){
            if (err) {
                console.log('Error while updating purchase: ' + err);
                res.json(err);
                return;
            }
        });
    }
}