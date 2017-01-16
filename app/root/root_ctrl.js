var app = angular.module('app');

app.controller('rootController', function($scope, $rootScope, $window, rootServices, confirm) {

    if ($window.localStorage["twitter-userSignedIn"]) {
        $scope.userData = $rootScope.twitterData;
    }

    $scope.loginToTwitter = function() {
        rootServices.loginToTwitter()
            .then(function(response) {
                if (response.data.requestToken) {
                    $window.location.href = 'https://www.twitter.com/oauth/authenticate?oauth_token=' + response.data.requestToken
                } else {
                    services.userData()
                    then(function(twitterData) {
                        console.log("+++ 21 root_ctrl.js twitterData: ", twitterData)
                    })
                }
            })
    }

    $scope.sendTweet = function(message, index) {
        rootServices.sendTweet(message)
            .then(function(result) {
                console.log("+++ 35 root_ctrl.js result: ", result)
            })
    }

    $scope.logout = function() {
        function onYes() {
            rootServices.logout()
                .then(function(result) {
                    if (result.status) {
                        delete $rootScope.twitterData;
                        $scope.userData = {};
                        $scope.userData.signedIn = false;
                        window.localStorage.setItem('twitter-username', null);
                        window.localStorage.setItem('twitter-userSignedIn', false);
                    }
                })
        }
        confirm.initialize('Are you sure you want to logout?', onYes);
    }
});
