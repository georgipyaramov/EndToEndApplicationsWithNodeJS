var usersCtrl = require('./UsersController'),
    productsCtrl = require('./ProductsController'),
    categoriesCtrl = require('./CategoriesController'),
    purchasesCtrl = require('./PurchasesController'),
    reviewsCtrl = require('./ReviewsController');

module.exports = {
    users: usersCtrl,
    products: productsCtrl,
    categories: categoriesCtrl,
    purchases: purchasesCtrl,
    reviews: reviewsCtrl
}