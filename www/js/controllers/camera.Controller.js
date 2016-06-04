app.controller('cameraController', function($scope, $cordovaCamera, imageFactory, photoIP) {


  $scope.UploadImage = function() {
    imageFactory.postPhoto($scope.srcImage, photoIP)
    .then(function(result) {
      // Success!
      console.log('file uploaded in controller');
    }, function(err) {
      console.log('file not so uploaded!!!!');
    }, function (progress) {
      // constant progress updates
    });
  };


    $scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            // destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 1944,
            targetHeight: 2592,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    };//end takeImage



});//endcontroller
