app.controller('ShowController', function ($scope, $state, socket, SequenceHandler) {
  // console.log('Velocity', Velocity);

  $scope.message = 'Test';

  // function getPhotoIP(){
  //     $scope.photoIP = ipAddressFactory.photoAddress();
  // }
  // getPhotoIP();

  $scope.itemColor = 'red';
  socket.ping();

  socket.on('play',function(data){
    SequenceHandler.loadSequence(data.sequence);

    if(SequenceHandler.getTransportState() === 'stopped'){
      //play the sequence
      SequenceHandler.queueStart(data.startTime, true);
    }
  });

});
