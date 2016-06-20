// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionic-socketio-chat-client', ['ionic','ionic-material','ngCordova', 'ngAnimate','ionMdInput', 'ngTwitter', 'ngCordovaOauth'])
// var app = angular.module('ionic-socketio-chat-client', ['ionic', 'ngCordova', 'ngAnimate'])

.run(function($ionicPlatform, ipAddressFactory, socket) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // window.open = cordova.InAppBrowser.open;

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    ionic.Platform.fullScreen();

    if(window.StatusBar) {
      StatusBar.hide();
    }


    /// init server connection ///
    ipAddressFactory.fetchIpAddresses()
    .then(function(){
      //connect to client socket ipAddressFactory.getSocketIP()
      socket.connect('http://192.168.1.120:3000', '/client');
      socket.startPingRepeat(200);
    });

  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('Login', {
      url: '/login',

      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('Tweet', {
      url: '/tweet',
      templateUrl: 'templates/tweet.html',
      controller: function ($scope, $twitterApi, $state, $timeout) {


        // var tweets = ['"better together."', '"together as one."', '"together"'];

        $scope.message = 'Tweet it!';

        $scope.tweet = {
          message: '"together @ fullstack."',
          sending: false
       };

        $scope.submitTweet = function () {
          $scope.message = 'Posting...'
          $twitterApi.postStatusUpdate($scope.tweet.message)
            .then(function (result) {
              $scope.message = 'Posted! Redirecting to the show...'
              $timeout(function () {
                $state.go('stagingPage');
              }, 1000);
            })
        }

      }
    })
    .state('cameraPage', {
      url: '/cameraPage',
      templateUrl: 'templates/cameraPage.html',
      controller: 'cameraController',
      params: {
        photoType: 0
      },
      resolve: {
        photoType:	function($stateParams){
          return	$stateParams.photoType;
        }//end photoType
      }//end resolve
    })
    .state('showPage', {
      url: '/showPage',
      templateUrl: 'templates/showPage.html',
      controller: 'ShowController'
    })
    .state('stagingPage', {
      url: '/stagingPage',
      templateUrl: 'templates/stagingPage.html',
      controller: 'StagingController'
    })
    .state('contestPage', {
      url: '/contestPage',
      templateUrl: 'templates/contestPage.html',
      controller: 'ContestController',
      params:{
        message:null
      }

    })
    .state('settingsPage', {
      url: '/settingsPage',
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController'
    });
  $urlRouterProvider.otherwise('/login');
});
