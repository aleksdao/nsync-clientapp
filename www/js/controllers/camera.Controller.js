app.controller('cameraController', function($scope, $cordovaCamera, imageFactory ) {


  $scope.UploadImage = function() {
    imageFactory.postPhoto($scope.srcImage)
    .then(function(result) {
      // Success!
      console.log('file uploaded');
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
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
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
