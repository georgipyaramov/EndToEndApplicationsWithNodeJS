app.controller('ProductsListCtrl', function ($scope, $location, ProductsData, identity) {
    $scope.products = ProductsData.ProductsData.query();
    $scope.isAdmin = identity.isAuthorizedForRole('admin');

    $scope.createProductRedirect = function () {
        $location.path('/products/create');
    }
});