app.controller('cameraController', function($scope, $cordovaCamera, $state, imageFactory, ipAddressFactory) {

  var photoIP = ipAddressFactory.getPhotoIP();

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
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            targetHeight: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            cameraDirection: 'FRONT'
        };

        $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
            $scope.UploadImage();
            $state.go('stagingPage');
        }, function(err) {
            // error
        });
    };//end takeImage

});//endcontroller
