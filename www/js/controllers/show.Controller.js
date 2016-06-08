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
    $scope.message = data.sequence.settings.bpm;

    if(SequenceHandler.getTransportState() === 'stopped'){
      //play the sequence
      SequenceHandler.queueStart(data.startTime, true);
    }
  });

  socket.on('get photo', function(){
    $state.go('cameraPage');
  });

  socket.on('send message', function(data){
    window.plugins.toast.showWithOptions({
      message: data.text,
      duration: data.duration, // 2000 ms
      position: "center",
      styling: {
        // opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        // backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
        // textColor: '#FFFF00', // Ditto. Default #FFFFFF
        textSize: 50 // Default is approx. 13.
        // cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        // horizontalPadding: 20, // iOS default 16, Android default 50
        // verticalPadding: 16 // iOS default 12, Android default 30
      }
    });
  });

});
