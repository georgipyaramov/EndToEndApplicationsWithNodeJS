app.factory('cachedProducts', function(ProductsData) {
    var cachedProducts;

    return {
        query: function() {
            if (!cachedProducts) {
                cachedProducts = ProductsData.ProductsData.query();
            }

            return cachedProducts;
        }
    }
});