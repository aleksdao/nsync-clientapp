//this is method that returns a promise that is resolved when the device is ready
app.factory('ionicReady', function($ionicPlatform) {
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
