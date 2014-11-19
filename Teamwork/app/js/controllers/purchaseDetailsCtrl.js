'use strict';

app.controller('PurchaseDetailsCtrl', function PurchaseDetailsCtrl($scope, $routeParams, notifier, purchasesData) {

    purchasesData.getPurchaseDetails($routeParams.id)
        .then(function (data) {
            $scope.currPurchase = data;
        }, function (err) {
            notifier.error(err.message);
        });

    $scope.leaveReview = leaveReview;
    function leaveReview() {

    }
});
