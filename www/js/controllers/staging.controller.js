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

  socket.on('get photo', function(data){
    console.log('get photo data', data);
    $state.go('cameraPage', data);
    //pass the photo type data as a paramater to the cameraPage state, changing the words based on the event, 1 for front facing, 0 for selfie
  });

  socket.on('send message', function(data){
    if(SequenceHandler.getTransportState() === 'stopped'){

      window.plugins.toast.showWithOptions({
        message: data.text,
        duration: data.duration, // 2000 ms
        position: "center",
        styling: {
            textSize: 30 // Default is approx. 13.
            }
      });

    }

  });

});
