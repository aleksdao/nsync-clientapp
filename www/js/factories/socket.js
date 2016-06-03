app.factory('ServerSocketFactory', function (socketFactory, ipAddressFactory) {

var socketIP = ipAddressFactory.socketAddress();

  //create socket and connect to http://localhost:3000
  var myIOSocket = io.connect('http://' + socketIP);
  mySocket = socketFactory({
    ioSocket: myIOSocket
  });

  return mySocket;

});
