var app = angular.module('app');

app.factory('confirm', function($uibModal) {
    var service = {};
    service.initialize = function(message, onYes) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/root/confirm.html',
            controller: 'confirmModal',
            size: 'sm',
            resolve: {
                message: function() {
                    return message;
                },
                onYes: function() {
                    return onYes;
                }
            }
        });
    }

    return service;
})

app.controller('confirmModal', function($scope, $uibModalInstance, message, onYes) {
    $scope.cancel = function() {
        $uibModalInstance.close();
    };

    $scope.proceed = function() {
        $uibModalInstance.close();
        onYes();
    }

    $scope.message = message;
});
