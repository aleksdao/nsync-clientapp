app.factory('ServerSocketFactory', function (socketFactory, ipAddressFactory) {

var tools = {

    getSocket : function(){
      // gets ip addresses from heroku dns server
      return ipAddressFactory.socketAddress()
      .then(function(addresses){
        // create socket and connect
        var myIOSocket = io.connect('http://' + addresses.data.socketIP + '/client');
            mySocket = socketFactory({
              ioSocket: myIOSocket
            });
        return mySocket;
      });//end then

    }//end getSocket
};//end tools

return tools;

});
