app.factory('ProductsData', function ($resource, $http, $q) {
    var baseUrl = '/api/products',
        ProductsData = $resource(baseUrl + '/:id', {id: '@id'}, { update: {method: 'PUT', isArray: false}});

    function createProduct(product) {
        var deferred = $q.defer();
        console.log(product);
        $http.post(baseUrl, product)
            .success(function () {
                deferred.resolve();
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        ProductsData: ProductsData,
        createProduct: createProduct
    }
});