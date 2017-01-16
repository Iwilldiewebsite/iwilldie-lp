/**
 * @ngdoc module
 * @name app
 * @description
 *
 * Place all application-wide root-level injections here.
 **/
(function () {
    'use strict';

    angular
        .module('app', [
            'app.components',
            'app.services',
            'app.factories',
            'app.routing'
        ]);
})();
