app.controller('LoginController', function ($scope, $state, socket) {

  $scope.logIn = function(){

    socket.emit('add user', {name: 'Cool Bro Mobile'});
    $state.go('showPage');

  };
});
