app.controller('ShowController', function ($scope, $state, socket, SequenceHandler) {
  // console.log('Velocity', Velocity);

  $scope.message = 'Test';

  // function getPhotoIP(){
  //     $scope.photoIP = ipAddressFactory.photoAddress();
  // }
  // getPhotoIP();

  SequenceHandler.init({body: '#showText'});

  $scope.itemColor = 'red';
  socket.startPingRepeat(); //poll server until we start show

  //var poo = angular.element(document.querySelector('#showText'));
  socket.on('play',function(data){
    SequenceHandler.loadSequence(data.sequence);
    console.log(socket.getLatency())
    if(SequenceHandler.getTransportState() === 'stopped'){
      //play the sequence
      SequenceHandler.queueStart(data.startTime, true);
    }
  });

});
