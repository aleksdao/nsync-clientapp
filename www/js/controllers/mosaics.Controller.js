app.controller('MosaicsController', function($scope, $state, mosaicName_URL, $window, $location) {
$scope.mosaicName_URL = mosaicName_URL;
console.log('mosaicName_URL', mosaicName_URL);

$scope.openMosaic = function (url) {
        $window.open(url, '_blank', 'location=yes');
    };

});//endcontroller
