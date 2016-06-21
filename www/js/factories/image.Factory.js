app.factory('imageFactory',function($http, ionicReady, $cordovaFileTransfer, $cordovaToast, $cordovaVibration, $state){

	return{

		postPhoto: function(imageDataIn, ipin){
			var photoIP = ipin;
			var imageData = imageDataIn;

			ionicReady().then(function() {
			  var ft = new FileTransfer();

        var server = photoIP +'/api/photo';

        var trustAllHosts = true;

        var ftOptions = new FileUploadOptions();
        ftOptions.fileKey = 'myPhoto';
        ftOptions.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        ftOptions.mimeType = 'image/jpeg';
        ftOptions.httpMethod = 'POST';

            $cordovaFileTransfer.upload(encodeURI(server), imageData, ftOptions, trustAllHosts)
              .then(function(result) {
								console.log('success in here dude: ' + angular.toJson(result));
								navigator.vibrate(750);
								window.plugins.toast.showWithOptions({
									message: "Photo Sent!",
									duration: "Long", // 2000 ms
									position: "top",
									styling: {
										// opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
										// backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
										// textColor: '#FFFF00', // Ditto. Default #FFFFFF
										textSize: 30 // Default is approx. 13.
										// cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
										// horizontalPadding: 20, // iOS default 16, Android default 50
										// verticalPadding: 16 // iOS default 12, Android default 30
									}
								});
								$state.go('stagingPage');
              },
              function(err) {
                console.log('error in here dude: ' + err);
              },
              function (progress) {
              // constant progress updates
            });
						});
		}//end postPhoto

	};
});
