app.controller('ShowController', function ($scope, $state, socket, SequenceHandler) {
  $scope.message = 'Test';


  SequenceHandler.init({
      container: '#showPage',
      title:  '#showTitle',
      body: '#showText'
      });

  $scope.itemColor = 'red';
  socket.startPingRepeat(); //poll server until we start show

  socket.on('play',function(data){
    SequenceHandler.loadSequence(data.sequence);
    console.log(socket.getLatency());
    if(SequenceHandler.getTransportState() === 'stopped'){
      //play the sequence
      SequenceHandler.queueStart(data.startTime, true);
    }
  });

});
