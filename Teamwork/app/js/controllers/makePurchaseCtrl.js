'use strict'
app.controller('MakePurchaseController', function($scope, $routeParams, $location, purchasesData, notifier) {
    $scope.productId = $routeParams.id;
    $scope.makePurchase = makePurchase;

    function makePurchase(purchase){
        purchase.productId = $scope.productId;

        purchasesData.create(purchase)
            .then(function(data){
                notifier.success('Purchase made!');
                $location.path('/products');
            }, function(err){
                notifier.error(err.message);
            });
    }
});
