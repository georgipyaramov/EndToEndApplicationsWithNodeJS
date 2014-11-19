'use strict';

app.factory('purchasesData', ['$http', '$q', function tripsData($http, $q) {
    //TODO: fix baseServiceUrl
    var purchasesApi = '/api/purchases';

    return {
        getUserPurchases: function() {
            var deferred = $q.defer();

            $http.get(purchasesApi)
                .success(function(data) {
                    deferred.resolve(data);
                }, function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getPurchaseDetails: function(id){
            purchasesApi = purchasesApi + '/' + id;
            var params = {};

            var deferred = $q.defer();
            $http.get(purchasesApi,{
                params: params})
                .success(function(data) {
                    deferred.resolve(data);
                }, function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        create: function(purchase){
            var deferred = $q.defer();
            var headers = {};
            headers['Content-Type'] = 'application/x-www-form-urlencoded';

            $http.post(purchasesApi,
                purchase,
                {headers: headers})
                .success(function(data) {
                    deferred.resolve(data);
                }, function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
}])