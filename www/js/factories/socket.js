app.factory('ServerSocketFactory', function (socketFactory) {
  //create socket and connect to http://localhost:3000
  var myIOSocket = io.connect('http://192.168.2.53:3000');
  mySocket = socketFactory({
    ioSocket: myIOSocket
  });

  return mySocket;

});
