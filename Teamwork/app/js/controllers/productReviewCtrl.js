app.controller('ProductReviewCtrl', function ($scope, $routeParams, $location, notifier, reviewData, identity) {
    $scope.prodId = $routeParams.id;
    $scope.identity = identity;

    $scope.sendReview = function (productId, review) {
        reviewData.createReview(productId, review)
            .then(function (success) {
                notifier.success('Review added successfully!');
                $location.path('/products');
            }, function (error) {
                notifier.error('Error:' + error);
            })
    }
});