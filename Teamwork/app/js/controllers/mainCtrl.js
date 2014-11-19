app.controller('MainCtrl', function ($scope, cachedProducts) {
    $scope.products = cachedProducts.query();
});