app.factory('imageFactory',function($http, ionicReady, $cordovaFileTransfer, $cordovaToast, $cordovaVibration){

	return{

		postPhoto: function(imageDataIn, photoIP){
			var imageData = imageDataIn;

			ionicReady().then(function() {
			  var ft = new FileTransfer();

        var server = 'http://' + photoIP +'/api/photo';

        var trustAllHosts = true;

        var ftOptions = new FileUploadOptions();
        ftOptions.fileKey = 'myPhoto';
        ftOptions.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        ftOptions.mimeType = 'image/jpeg';
        ftOptions.httpMethod = 'POST';

            $cordovaFileTransfer.upload(encodeURI(server), imageData, ftOptions, trustAllHosts)
              .then(function(result) {
								console.log('success in here dude: ' + angular.toJson(result));
								$cordovaVibration.vibrate(200);
								$cordovaToast
								.showLongCenter('Photo Sent!');
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
