app.controller('ProductCreateCtrl', function ($scope, $upload, $location, notifier) {
    $scope.onFileSelect = function ($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/api/products',
                method: 'POST',
                //headers: {'header-key': 'header-value'},
                //withCredentials: true,
                data: {product: $scope.product},
                file: file
            }).success(function (data, status, headers, config) {
                notifier.success('Product created successfully!');
                $location.path('/products');
            });
        }
    }
});