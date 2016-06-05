app.controller('ShowController', function ($scope, $state, socket, ipAddressFactory) {
  // console.log('Velocity', Velocity);

  $scope.message = 'Test';

  // function getPhotoIP(){
  //     $scope.photoIP = ipAddressFactory.photoAddress();
  // }
  // getPhotoIP();

  $scope.itemColor = 'red';
  socket.ping();

});
