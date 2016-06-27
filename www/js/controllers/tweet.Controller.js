app.controller('TweetController', function ($scope, $twitterApi, $state, $timeout) {
    // var tweets = ['"better together."', '"together as one."', '"together"'];
    $scope.message = 'Tweet it!';

    $scope.tweet = {
      message: '"together @ fullstack."',
      sending: false
   };

   $scope.printAccount = function () {
     console.log('here we are');
    $twitterApi.getRequest('https://api.twitter.com/1.1/account/settings.json')
     .then(function (data) {
       $scope.data = data;
     });
   };

    $scope.submitTweet = function () {
      $scope.message = 'Posting...';
      $twitterApi.postStatusUpdate($scope.tweet.message)
        .then(function (result) {
          $scope.message = 'Posted! Redirecting to the show...';
          $timeout(function () {
            $state.go('stagingPage');
          }, 1000);
        });
    };
  });//end controller
