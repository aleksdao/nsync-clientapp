app.controller('ErrorController', function($scope, $interval, $state, socket, ipAddressFactory){

  if(socket.connected()){
    $state.go('Login');
  }
console.log('socket connected',socket.connected());
  var counter = 0;

  //set up an interval to check connection status
  var checkServer = $interval(function(){

    if(counter === 10){
      //reset counter
      counter = 0;
      //check to see if the server's IP changed
      ipAddressFactory.fetchIpAddresses()
      .then(function(){
        socket.connect(ipAddressFactory.getSocketIP(), '/client');
        if(socket.connected()){
           $interval.cancel(checkServer);
           $state.go('Login');
        }
      });

    } else{
      if(socket.connected()){
         $interval.cancel(checkServer);
         $state.go('Login');
      }
    }

    counter++;

  }, 1000);

});
