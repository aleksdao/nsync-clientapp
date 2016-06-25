app.controller('MosaicsController', function($scope, $state, data, $window, $location) {
$scope.mosaicName_URL = data;

$scope.openMosaic = function (url) {
        $window.open(url, '_blank', 'location=yes');
    };

});//endcontroller
