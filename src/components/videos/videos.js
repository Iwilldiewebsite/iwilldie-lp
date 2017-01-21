(function () {
    'use strict';

    angular
        .module('app.components.videos')
        .component('videos', getComponentObject());

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
            templateUrl: "components/videos/videos.html",
            controller: ('videos', videosPage)
        }
    }

    videosPage.$inject = [
        '$scope',
        '$state',
        '$rootScope'
    ];

    /**
     * @description The template Controller which deals with all controller-view interactions in
     * the videos page.
     * @returns {void} Nothing
     * @constructor
     */
    function videosPage($scope, $state, $rootScope) {
        var vm = this;
    }
})();
