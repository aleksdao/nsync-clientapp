app.factory('SequenceHandler', function($http, $state, $timeout, socket){

  var transitionTime;
  var _sequence;
  var _screenElement = {
    container: undefined,
    title: undefined,
    body: undefined
  }; //used to store target DOM objects

  var _actionFunc = {
    changeColor: changeColor,
    fadeColorTo: fadeColorTo,
    changeText: changeText,
    vibrate: vibrate,
    strobeFlash: strobeFlash
  };

  /////// Event Action Functions //////
  function changeColor(params){
    setTransitionTime(0);
    _screenElement.container.css("background-color", params.color);

  }

  function fadeColorTo(params, duration){
    setTransitionTime(transitionTime);
    _screenElement.container.css("background-color", params.color);

  }

  function changeText(params){
    _screenElement[params.target].text(params.text);
    if(params.color){
      _screenElement[params.target].css("color", params.color);
    }

  }


  function vibrate(params){
    navigator.vibrate(750);
  }


  function strobeFlash(params){
    // turn flash on
    window.plugins.flashlight.switchOn();
    // turn flash off
    setTimeout(function() {
      window.plugins.flashlight.switchOff();
    }, transitionTime);
  }

  // sets CSS transiton time
  function setTransitionTime (timeMs){
    _screenElement.container.css({'transition-duration': timeMs + 'ms'});

  }

  return {
    init: function(screenElement){
      _screenElement.container = angular.element(document.querySelector(screenElement.container));
      _screenElement.title = angular.element(document.querySelector(screenElement.title));
      _screenElement.body = angular.element(document.querySelector(screenElement.body));
    },

    loadSequence: function(sequence){

      //set Transport settings
      Tone.Transport.set(sequence.settings);

      //load in the sequence
      _sequence = new Sequence(sequence);

      //set event loop
      Tone.Transport.scheduleRepeat(this.eventLoop, _sequence.getSettings().resolution, 0);


      //calculate transition time for FX
      transitionTime = (bpmScale[_sequence.getSettings().resolution] / _sequence.getSettings().bpm)*1000;

      //set our css transition on container
      var transSet = {
        'transition-property': 'background-color',
        'transition-timing-function': 'ease-in'
      };
      _screenElement.container.css(transSet);
    },

    fetchShow: function(){
      return $http.get('http://jaj-showeditor.herokuapp.com/api/shows')
      .then(function(response){
        return response.data[0];
      });
    },

    getTransportState: function(){
      return Tone.Transport.state;
    },

    queueStart: function(preRoll, adjustForLatency){
      var startTime;

      if(adjustForLatency)
        startTime = (preRoll - socket.getLatency()) / 1000;
      else
        startTime = preRoll / 1000;

      this.stop(); //reset start time

      Tone.Transport.start("+" + startTime); //start Transport
    },

    stop: function(){
      Tone.Transport.stop();
      Tone.Transport.position = 0;
    },

    eventLoop: function(){
      //grab current time code position
      var currPos = Tone.Transport.position;

      //check to see if the show is over, if so, stop Transport
      if (currPos == _sequence.getShowLength()){
        Tone.Transport.stop();
        Tone.Transport.position = 0;

        //go back to stagingPage
        $timeout(function(){
          $state.go('stagingPage');
        }, 2000);
        return;
      }

      //play current events
      _sequence.timeline.forEachAtTime(currPos, function(event) {
        if (!event.preload) {
          var duration = (15 / _sequence.getSettings().bpm) * 1000;
          _actionFunc[event.action](event.params, duration);
        }
      });

      //check for preloaded events
      _sequence.timeline.forEachAtTime(currPos + "+" + _sequence.getSettings().resolution, function(event) {
        if (event.preload) {
          _actionFunc[event.action](event.params, transitionTime);
        }
      });
    }
  };
});//end factory

//bpm time LUT
var bpmScale = {
  '4n': 60,
  '8n': 30,
  '16n': 15
};

/////// Sequence obj ///////
function Sequence(sequence){
  if(!sequence)
    return;

  this._sequence = sequence;
  this.timeline = new Tone.Timeline();

  this.generateTimeline();
}

Sequence.prototype.generateTimeline = function(){
    var self = this;

    this._sequence.events.forEach(function(event) {
        self.timeline.addEvent(event);
    });

};

Sequence.prototype.getSettings = function(){
  return this._sequence.settings;
};

Sequence.prototype.getShowLength = function(){
  return this._sequence.show_length;
};
