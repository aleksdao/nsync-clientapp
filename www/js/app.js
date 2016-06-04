// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionic-socketio-chat-client', ['ionic',  'btford.socket-io', 'ngCordova', 'ngAnimate'])
// var app = angular.module('ionic-socketio-chat-client', ['ionic', 'ngCordova', 'ngAnimate'])

.run(function($ionicPlatform, socket) {
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
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    /// init admin socket connection ///
    socket.connect('/client');

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
      resolve:{
      photoIP : function(ipAddressFactory){
        console.log('inside camera page state');
         return ipAddressFactory.photoAddress();
      }
    }//end resolve
    })
    .state('showPage', {
      url: '/showPage',
      templateUrl: 'templates/showPage.html',
      controller: 'ShowController',
      resolve:{
      // clientSocket : function(socket){
      //    return socket.connect('/client');
      // }
    }//end resolve
    });
  $urlRouterProvider.otherwise('/login');
});
