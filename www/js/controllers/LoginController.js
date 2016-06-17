app.controller('LoginController', function ($scope, $state, socket, $cordovaOauth, $twitterApi, $state) {

  var myTwitterToken;
  var twitterKey = 'STORAGE.TWITTER.KEY';
  var clientId = 'rMkOV182Kn9JR6uLSGb7hOnoF';
  var clientSecret = 'gIkO3kxjzCANbdRyWflMoy98r1kyabeX55FaAIUF2DkE9snJ81';

  $scope.data = {name:''};

  $scope.logIn = function(){


    socket.emit('add user', { name: $scope.data.name });
    $state.go('stagingPage');
    // $state.go('Tweet');

  };

  $scope.loggedIntoTwitter = false;

  $scope.logIntoTwitter = function () {
    myTwitterToken = JSON.parse(window.localStorage.getItem(twitterKey));
    if (!myTwitterToken) {
      $cordovaOauth.twitter(clientId, clientSecret)
        .then(function (result) {
          myTwitterToken = result;
          window.localStorage.setItem(twitterKey, JSON.stringify(myTwitterToken));
          $twitterApi.configure(clientId, clientSecret, myTwitterToken);
          $twitterApi.getRequest('https://api.twitter.com/1.1/account/settings.json')
            .then(function (data) {
              $scope.data.name = data.screen_name;
              $scope.loggedIntoTwitter = true;

            })

          // $state.go('Tweet', { token: myTwitterToken });
        }, function(error) {
            console.log(error);
      });

    }
    else {
      $twitterApi.configure(clientId, clientSecret, myTwitterToken);
      $twitterApi.getRequest('https://api.twitter.com/1.1/account/settings.json')
        .then(function (data) {
          $scope.data.name = data.screen_name;
          $scope.loggedIntoTwitter = true;

        })

      // $state.go('Tweet', { token: myTwitterToken });
    }
  }




});
