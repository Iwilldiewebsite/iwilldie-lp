(function () {
    'use strict';

    angular
        .module('app.components.submissions')
        .component('submissions', getComponentObject());

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
            templateUrl: "components/submissions/submissions.html",
            controller: ('submissions', submissionsPage)
        }
    }

    submissionsPage.$inject = [
        '$scope',
        '$state',
        '$rootScope'
    ];

    /**
     * @description The template Controller which deals with all controller-view interactions in
     * the submissions page.
     * @returns {void} Nothing
     * @constructor
     */
    function submissionsPage($scope, $state, $rootScope) {
        var vm = this;
    }
})();
