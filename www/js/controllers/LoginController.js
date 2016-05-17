app.controller('LoginController', function ($scope, $state, $sanitize, ServerSocketFactory, $rootScope) {
  // var self = this;
  // $scope.name = {};
  // $scope.join = function () {
  //   // console.log($scope.logcntrl.nickname);
  //   // var nickname = $scope.nickname;
  //   // console.log($scope.name.nickname)
  //   var nickname = $sanitize($scope.name.nickname);
  //   // console.log($scope.nickname);
  //   if (nickname)
  //     $state.go('Chat', { nickname: nickname });
  //
  // }

  var show;
  var prevColor;

  function runEvent(time) {

        //grab current time code position
        var currPos = Tone.Transport.position;

        //check to see if the show is over, if so, stop Transport
        if (currPos === show.length) {
            Tone.Transport.position = 0;
            return Tone.Transport.stop();
        }

        var body = document.getElementById('changeColor1');
        // var ionView = document.getElementById('changeColor1');

        if (show[currPos]) //if there is an event at this time, change the DOM
          {
            // if (prevColor)
            //   $scope.viewColor = prevColor;
            body.style.backgroundColor = show[currPos].changeColor;
            // prevColor = show[currPos].changeColor;
          }

    }

  Tone.Transport.set({
      bpm: 60
  });

  ServerSocketFactory.on('play', function (data) {
    console.log('play');
    show = data.show; //get the show script
    Tone.Transport.start(); //start Transport
  });

  Tone.Transport.scheduleRepeat(runEvent, "4n", 0);


})
