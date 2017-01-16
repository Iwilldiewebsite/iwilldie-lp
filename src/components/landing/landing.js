(function () {
    'use strict';

    angular
        .module('app.components.landing')
        .component('landing', getComponentObject());

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
            templateUrl: "components/landing/landing.html",
            controller: ('landing', landingPage)
        }
    }

    landingPage.$inject = [
        '$scope',
        '$state',
        '$rootScope'
    ];

    /**
     * @description The template Controller which deals with all controller-view interactions in
     * the header/footer
     * @returns {void} Nothing
     * @constructor
     */
    function landingPage($scope, $state, $rootScope) {
        var vm = this;
    }
})();