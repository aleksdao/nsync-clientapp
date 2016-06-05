app.controller('ShowController', function ($scope, $state, socket, ipAddressFactory) {
  // console.log('Velocity', Velocity);

  $scope.message = 'Test';



  $scope.itemColor = 'red';
  socket.ping();

});
