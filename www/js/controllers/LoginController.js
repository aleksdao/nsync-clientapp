app.controller('LoginController', function ($scope, $state, socket) {

  $scope.data = {name:''};

  $scope.logIn = function(){


    socket.emit('add user', { name: $scope.data.name });
    $state.go('showPage');

  };
});
