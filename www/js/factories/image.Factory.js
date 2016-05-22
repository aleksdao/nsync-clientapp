app.factory('imageFactory',function($http, ionicReady){

	return{
	// 	getSamplePhoto : function(){
	// 		return $http.get("http://localhost:5000/api/photo",{responseType: "blob"})
	// 			.then(function(data){
	// 				// var file = new File([data], "sample.jpg");
	// 				return data;
	// 			});
	// },



		// postPhoto : function(photo){
		// 	return $http.post('http://localhost:5000/api/photo', {myPhoto:photo})
		// 	.then(function(response){
		// 		console.log('response!', response);
		// 		return response;
		// 	},function(err){
		// 		return err;
		// 	});
		// },

		postPhoto: function(imageData){
			// console.log(imageData);

			ionicReady().then(function(imageData) {
			  var ft = new FileTransfer();
			  console.log('ft', ft);

        var server = 'http://localhost:5000/api/photo';

        var trustAllHosts = true;

        var ftOptions = new FileUploadOptions();
        ftOptions.fileKey = 'myPhoto';
        ftOptions.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        ftOptions.mimeType = 'image/jpeg';
        ftOptions.httpMethod = 'POST';

            $cordovaFileTransfer.upload(encodeURI(server), imageData, ftOptions, trustAllHosts)
              .then(function(result) {
              console.log('success: ' + angular.toJson(result));
              },
              function(err) {
              // Error
                console.log('error: ' + err);
              },
              function (progress) {
              // constant progress updates
            });
						});
		}//end postPhoto

	};
})
.factory('ionicReady', function($ionicPlatform) {
  var readyPromise;

  return function () {
    if (!readyPromise) {
      readyPromise = $ionicPlatform.ready();
    }
    return readyPromise;
  };
});

// to use this...
// ionicReady().then(function() {
//     // Stuff to do when the platform is finally ready.
//   });
