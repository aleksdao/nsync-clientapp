app.controller('StagingController', function ($scope, $state, socket, SequenceHandler) {

  SequenceHandler.init({
      container: '#showPage',
      title:  '#showTitle',
      body: '#showText'
      });

  socket.on('send show',function(data){
    SequenceHandler.loadSequence(data.sequence);

    $state.go('showPage');
  });

  socket.on('get photo', function(){
    $state.go('cameraPage');
  });

  socket.on('send message', function(data){
    if(SequenceHandler.getTransportState() === 'stopped'){

      window.plugins.toast.showWithOptions({
        message: data.text,
        duration: data.duration, // 2000 ms
        position: "center",
        styling: {
            textSize: 20 // Default is approx. 13.
            }
      });

    }

  });

});
