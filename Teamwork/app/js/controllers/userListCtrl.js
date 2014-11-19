app.controller('UserListCtrl', function ($scope, $route, notifier, UsersResource, admin) {
    $scope.users = UsersResource.query();

    $scope.deleteUser = function (id) {
        admin.deleteUser(id)
            .then(function (success) {
                notifier.success('User deleted successfully');
                $route.reload();
            }, function (error) {
                notifier.error('Error:' + error);
            })
    }
});