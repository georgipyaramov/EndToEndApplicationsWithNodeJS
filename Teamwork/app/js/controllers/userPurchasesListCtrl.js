'use strict';

app.controller('UserPurchasesListCtrl', function UserPurchasesListCtrl($scope, notifier, purchasesData) {
    purchasesData.getUserPurchases()
        .then(function (data) {
            $scope.purchases = data;
        }, function (errorData) {
            notifier.error('Error getting user purchases');
        });
});