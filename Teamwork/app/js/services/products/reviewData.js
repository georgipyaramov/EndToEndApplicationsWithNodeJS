app.factory('reviewData', function ($http, $q) {
    var baseUrl = '/api/products';

    function createReview(productId, review) {
        var deferred = $q.defer();

        $http.post(baseUrl + '/' + productId + '/reviews', review)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function getReviewsByProductId(productId) {
        var deferred = $q.defer();

        $http.get(baseUrl + '/' + productId + '/reviews')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        createReview: createReview,
        getReviewsByProductId: getReviewsByProductId
    }
});