app.controller('LoginController', function ($scope, $state, socket) {

$scope.logIn = function(){

  socket.emit('add user', {name: 'Cool Bro Mobile 700fff0'});
  $state.go('showPage');

};
});
