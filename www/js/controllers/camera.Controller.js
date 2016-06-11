app.controller('cameraController', function($scope, $cordovaCamera, imageFactory, ipAddressFactory) {

  var photoIP = ipAddressFactory.getPhotoIP();

  console.log('photoIP', photoIP);

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
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    };//end takeImage



});//endcontroller
