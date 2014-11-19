app.factory('admin', function ($http, $q) {
    var baseUrl = '/api';

    function deleteUser(id) {
        var deferred = $q.defer();

        $http.put(baseUrl + '/users/' + id, {})
            .success(function () {
                deferred.resolve();
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        deleteUser: deleteUser
    }
});