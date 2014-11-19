var Review = require('mongoose').model('Review');

module.exports = {
    createReview: function (req, res, next) {
        var newReviewData = req.body;
        newReviewData.productId = req.params.id;
        newReviewData.date = new Date();
        newReviewData.userId = req.user._id;
        newReviewData.user = req.user.username;

        Review.create(newReviewData, function (err, review) {
            if (err) {
                console.log('Failed to create new review: ' + err);
                res.send(err);
                return;
            }

            res.json(review);
        });
    },
    getAllReviewsForProduct: function (req, res) {
        // /api/products/:id/reviews
        var productId = req.params.id;
        Review.find({productId: productId}).exec(function (err, collection) {
            if (err) {
                console.log('Error while listing reviews: ' + err);
                res.send(err);
                return;
            }

            res.json(collection);
        });
    },
    getAllReviewsFromUser: function (req, res) {
        // /api/users/:id/reviews
        var userId = req.body.productId;
        Review.find({userId: userId}).exec(function (err, collection) {
            if (err) {
                console.log('Error while listing reviews: ' + err);
                res.send(err);
                return;
            }

            res.json(collection);
        });
    },
    remove: function (req, res) {
        // delete on /api/users/:userId/reviews/:reviewId
        var id = req.params['reviewId'];
        Review.findOneAndRemove({_id: id}).exec(function (err) {
            if (err) {
                console.log('Error deleting review');
                res.send(err);
                return;
            }

            res.end();
        });
    },
    update: function (req, res) {
        // put on /api/users/:userId/reviews/:reviewId
        var id = req.params['reviewId'];
        Review.findOneAndUpdate({_id: id}, req.body).exec(function (err) {
            if (err) {
                console.log('Error deleting review');
                res.send(err);
                return;
            }

            res.end();
        });
    }
}