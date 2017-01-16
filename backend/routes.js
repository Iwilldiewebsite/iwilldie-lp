var router = require('express').Router();
var path = require('path');

var secrets = require('./secrets.js');

// Twitter integration
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: secrets.consumerKey,
    consumerSecret: secrets.consumerSecret,
    callback: 'http://localhost:8080/twitterAuthenticated'
        // callback: 'http://WEBSITE_GOES_HERE.WHATEVER/twitterAuthenticated'
});

var OAuth = require('oauth').OAuth;
var oAuth;
oAuth = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token",
    secrets.consumerKey,
    secrets.consumerSecret,
    "1.0A", null, "HMAC-SHA1"
);

//Routes
router.get('/', function(request, response) {
    if (request.session.twitterData && request.session.twitterData.signedIn) {
        console.log("server.js - Serve index page - User Signed in")
        twitter.verifyCredentials(
            request.session.twitterAccess.accessToken, 
            request.session.twitterAccess.accessTokenSecret, 
            function(error, data, res) {
                if (error) {
                    console.log("+++ 56 server.js error: ", error)
                } else {
                    response.status(202)
                        .sendFile(path.resolve("app/index.html"));
                };
            }
        )
    } else {
        console.log("server.js - Serve index page - User NOT SIGNED IN")
        request.session.twitterData = {};
        request.session.twitterData.signedIn = false;
        response.status(202)
            .sendFile(path.resolve("app/index.html"));
    }
});

// Reroute to app
router.get('/twitterlogin', function(request, response) {

    if (request.session.twitterData && request.session.twitterData.signedIn) {
        response.redirect('/')
    } else {
        twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
            if (error) {
                console.log("Error getting OAuth request token : " + error);
                request.session.twitterData.signedIn = false;
                response.sendStatus(404)
            } else {
                request.session.twitterRequest = {};
                request.session.twitterData = {};
                request.session.twitterRequest.twitterRequestToken = requestToken;
                request.session.twitterRequest.twitterRequestTokenSecret = requestTokenSecret;
                request.session.twitterData.signedIn = true;
                response.status(200).json({ 
                    "requestToken": requestToken, 
                    "requestTokenSecret": requestTokenSecret, 
                    "results": results 
                })
            }
        });
    }
});

router.get('/twitterAuthenticated', function(request, response) {
    twitter.getAccessToken(
        request.session.twitterRequest.twitterRequestToken, 
        request.session.twitterRequest.twitterRequestTokenSecret, 
        request.query.oauth_verifier, 
        function(error, accessToken, accessTokenSecret, results) {
            if (error) {
                console.log(error);
            } else {
                request.session.twitterAccess = {}
                request.session.twitterAccess.accessToken = accessToken;
                request.session.twitterAccess.accessTokenSecret = accessTokenSecret;
                request.session.twitterData.twitterUsername = results.screen_name;
                response.redirect('/')
            }
        }
    );
});

router.get('/twitterdata', function(request, response) {
    response.status(200).send({
        twitterData: request.session.twitterData
    })
})

router.post('/sendTweet', function(request, response) {
    oAuth.post(
        "https://api.twitter.com/1.1/statuses/update.json",
        request.session.twitterAccess.accessToken,
        request.session.twitterAccess.accessTokenSecret, 
        { "status": request.body },
        function(error, data) {
            if (error) {
                console.log("+++ 122 server.js error: ", error)
                response.status(error.statusCode).send(error)
            } else {
                response.status(200).send(data)
            }
        }
    );
})

router.get('/logout', function(request, response) {
    request.session.destroy();
    if (!request.session) {
        console.log("Logged out")
        response.sendStatus(200)
    } else {
        console.log("Not logged out")
        response.sendStatus(400)
    };

})

module.exports = router
