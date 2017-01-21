(function () {
    'use strict';

    angular
        .module('app.components.about')
        .component('about', getComponentObject());

    /**
     * @name getComponentObject
     * @description
     *
     * This function returns a configuration object to the component.
     *
     * @returns {Object} the component configuration object
     **/
    function getComponentObject() {
        return {
            controllerAs: 'vm',
            bindings: {},
            templateUrl: "components/about/about.html",
            controller: ('about', aboutPage)
        }
    }

    aboutPage.$inject = [
        '$scope',
        '$state',
        '$rootScope'
    ];

    /**
     * @description The template Controller which deals with all controller-view interactions in
     * the about page.
     * @returns {void} Nothing
     * @constructor
     */
    function aboutPage($scope, $state, $rootScope) {
        var vm = this;
    }
})();
