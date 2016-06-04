app.factory('ipAddressFactory', function ($http) {
  var socketIP = '';
  var photoIP = '';


  var tools = {
  socketAddress : function()  {
    return $http.get('https://nsync-dns.herokuapp.com/')
    .then(function(addresses){
      photoIP = addresses.data.photoIP;
      return addresses;
    });

  },
  photoAddress : function()  {
    return photoIP;
  }

  };//end tools

  return tools;

});
