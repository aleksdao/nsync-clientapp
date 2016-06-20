app.factory('TwitterFactory', function ($twitterApi, $cordovaOauth) {

  var factory = {};
  var loggedIntoTwitter = false;

  var myTwitterToken;
  var twitterKey = 'STORAGE.TWITTER.KEY';
  var clientId = 'rMkOV182Kn9JR6uLSGb7hOnoF';
  var clientSecret = 'gIkO3kxjzCANbdRyWflMoy98r1kyabeX55FaAIUF2DkE9snJ81';

  factory.logIntoTwitter = function () {

    myTwitterToken = JSON.parse(window.localStorage.getItem(twitterKey));
    if (!myTwitterToken) {
      $cordovaOauth.twitter(clientId, clientSecret)
        .then(function (result) {
          loggedIntoTwitter = true;
          myTwitterToken = result;
          window.localStorage.setItem(twitterKey, JSON.stringify(myTwitterToken));
          $twitterApi.configure(clientId, clientSecret, myTwitterToken);
          return $twitterApi.getRequest('https://api.twitter.com/1.1/account/settings.json')


        }, function(error) {
            console.log(error);
      });

    }
    else {
      loggedIntoTwitter = true;
      $twitterApi.configure(clientId, clientSecret, myTwitterToken);
      return $twitterApi.getRequest('https://api.twitter.com/1.1/account/settings.json')

    }

  }

  factory.isLoggedIntoTwitter = function () {
    return loggedIntoTwitter;
  }

  factory.postStatusUpdate = function (msg) {
    return $twitterApi.postStatusUpdate(msg);

  }

  return factory;

})
