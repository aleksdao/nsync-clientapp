// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionic-socketio-chat-client', ['ionic','ionic-material','ngCordova', 'ngAnimate','ionMdInput'])
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
      //connect to client socket
      socket.connect(ipAddressFactory.getSocketIP(), '/client');
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
    .state('settingsPage', {
      url: '/settingsPage',
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController'
    });
  $urlRouterProvider.otherwise('/login');
});
