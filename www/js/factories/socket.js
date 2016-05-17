app.factory('ServerSocketFactory', function (socketFactory) {
  //create socket and connect to http://chat.socket.io
  // var myIOSocket = io.connect('http://chat.socket.io');
  var myIOSocket = io.connect('http://localhost:3000');
  mySocket = socketFactory({
    ioSocket: myIOSocket
  });

  return mySocket;

})
