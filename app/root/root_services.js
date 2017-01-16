var app = angular.module('app');

app.factory('rootServices', function($http, $rootScope) {
    var services = {};

    services.userData = function() {
        return $http.get($rootScope.serverUrl + '/twitterData')
    }

    services.loginToTwitter = function() {
        return $http.get($rootScope.serverUrl + '/twitterlogin')
    }

    services.sendTweet = function(message) {
        return $http({
            method: 'POST',
            url: $rootScope.serverUrl + '/sendTweet',
            data: {
                tweet: message
            }
        })
    }

    services.logout = function() {
        return $http.get($rootScope.serverUrl + '/logout')
    }

    return services;
})
