var app = angular.module('app', ['ngResource', 'ngRoute', 'angularFileUpload']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };
    $routeProvider
        .when('/', {
            templateUrl: '/partials/home',
            controller: 'MainCtrl'
        })
        .when('/products', {
            templateUrl: '/partials/products-list',
            controller: 'ProductsListCtrl'
        })
        .when('/products/create', {
            templateUrl: '/partials/product-create',
            controller: 'ProductCreateCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/products/:id', {
            templateUrl: '/partials/product-details',
            controller: 'ProductDetailsCtrl'
        })
        .when('/products/:id/purchase', {
            templateUrl: '/partials/purchase-product',
            controller: 'MakePurchaseController',
            resolve: routeUserChecks.authenticated
        })
        .when('/products/:id/reviews', {
            templateUrl: '/partials/add-review',
            controller: 'ProductReviewCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/signup', {
            templateUrl: '/partials/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/purchases', {
            templateUrl: '/partials/user-purchases',
            controller: 'UserPurchasesListCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/purchases/:id', {
            templateUrl: '/partials/purchase-details',
            controller: 'PurchaseDetailsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        });
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});