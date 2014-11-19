app.controller('ProductDetailsCtrl', function ($scope, $routeParams, cachedProducts, reviewData) {
    $scope.product = cachedProducts.query().$promise.then(function (collection) {
        collection.forEach(function (product) {
            if (product._id === $routeParams.id) {
                $scope.product = product;
            }
        })
    });

    $scope.reviews = reviewData.getReviewsByProductId($routeParams.id)
        .then(function (success) {
            $scope.reviews = success;
        });

    $scope.buy = buy;

    function buy(productId) {
        console.log(productId);
    };
});