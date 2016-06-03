app.factory('ipAddressFactory', function ($http) {
  var socketIP = '';
  var photoIP = '';
  function getIPAddresses(){
    return $http.get('https://nsync-dns.herokuapp.com/')
    .then(function(data){
      console.log('got the ip addresses',data);
      photoIP = data.photoIP;
      socketIP = data.socketIP;
    });
    }
  getIPAddresses();

  var tools = {
  socketAddress : function()  {
    return socketIP;
  },
  photoAddress : function()  {
    return photoIP;
  }

  };//end tools

  return tools;

});
