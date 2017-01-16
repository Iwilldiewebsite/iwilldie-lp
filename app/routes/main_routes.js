var app = angular.module('mainRoutes');

app.config(function($stateProvider, $urlRouterProvider) {
    // Now set up the states
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/root/index.html',
            controller: 'rootController'
        })

    $urlRouterProvider.otherwise("/home");
})