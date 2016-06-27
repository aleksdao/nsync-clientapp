app.controller('MosaicsController', function($scope, $state, $location, $stateParams) {
$scope.mosaicName_URL = $stateParams.data;
// console.log('data inside controller', $stateParams.data);

$scope.openMosaic = function (url) {
        // $window.open(url, '_blank', 'location=yes');
        // $window.open(url, '_blank');
        var newwindow = window.open(url,'_blank','location=no');
        newwindow.addEventListener('exit', function(){
          $state.go('stagingPage');

        });
        // newwindow.onload = function() {
        //   $state.go('stagingPage');
        //   console.log("callback");
        //   newwindow.console.log("callback in newwindow");
    };



});//endcontroller
