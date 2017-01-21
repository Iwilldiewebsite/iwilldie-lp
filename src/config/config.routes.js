(function () {
    'use strict';

    angular
        .module('app.routing', [
            'ui.router'
        ])
        .config(routes);

    routes.$inject = ['$urlRouterProvider', '$stateProvider'];

    function routes($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/page/landing');

        $stateProvider
            .state('pageFrame', {
                url: '/page',
                template: '<page-frame></page-frame>'
            })
            .state('landingPage', {
                parent: 'pageFrame',
                url: '/landing',
                template: '<landing></landing>'
            })
            .state('aboutPage', {
                parent: 'pageFrame',
                url: '/about',
                template: '<about></about>'
            })
            .state('videosPage', {
                parent: 'pageFrame',
                url: '/videos',
                template: '<videos></videos>'
            })
            .state('submissionsPage', {
                parent: 'pageFrame',
                url: '/submissions',
                template: '<submissions></submissions>'
            })
    }

})();
