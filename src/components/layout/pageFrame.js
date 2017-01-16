(function () {
    'use strict';

    angular
        .module('app.components.layout')
        .component('pageFrame', getComponentObject());

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
            templateUrl: "components/layout/pageFrame.html",
            controller: ('pageFrame', pageFrame)
        }
    }

    pageFrame.$inject = [
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
    function pageFrame() {

        var vm = this;
    }
})();