    //connect to socket server
    var serverLatency;
    var socket = io.connect('10.64.42.174:3000');
    socket.emit('add user', {name: 'Cool Bro Mobile'});
    socket.emit('latency', Date.now(), function(startTime) {
      serverLatency = Date.now() - startTime;
      console.log(serverLatency);
    });

    console.log("Heyyyyyyyyyyyy", socket);

var synth = new Tone.MonoSynth({
	"oscillator" : {
		"type" : "square"
 },
 "envelope" : {
 	"attack" : 0.1
 }
}).toMaster();

    //init the show
    var show;
    var timeline = new Tone.Timeline();
    //wait for the play command
    socket.on('play', function(data) {
        show = data.show; //get the show script
        Tone.Transport.set(show.settings);
        timeline = createTimeline(show.events);

        //schedule a listener to fire every 16th note
        Tone.Transport.scheduleRepeat(runEvent, show.settings.resolution, 0);
        console.log('show', data.startTime - serverLatency);
        var adjustedStart = (data.startTime - serverLatency) / 1000;
        console.log('startime:', data.startTime, 'latency:', serverLatency, 'adjusted', adjustedStart);
        Tone.Transport.start(adjustedStart); //start Transport
    });

    Tone.Transport.scheduleRepeat(metro, "4n", 0);

    function metro(){
      //play blip
      synth.triggerAttackRelease("C4", "128n");
    }
    function runEvent(time) {
        //grab current time code position
        var currPos = Tone.Transport.position;
        //check to see if the show is over, if so, stop Transport
        if (currPos == show.show_length) {
            Tone.Transport.position = 0;
            return Tone.Transport.stop();
        }
        timeline.forEachAtTime(currPos, function(event) {
          if (!event.preload) {
            if (event.action == 'changeColor') {
              Velocity(document.getElementById("changeColor"), {
                  backgroundColor: event.params.color,
                  loop: false
              }, 0);
            }
          }
        });
        /// PRELOAD ///
        timeline.forEachAtTime(currPos + "+" + show.settings.resolution, function(event) {
            if (event.preload) {
                if (event.action == 'fadeColorTo') {
                    var duration = (15 / show.settings.bpm) * 1000;
                    Velocity(document.getElementById("changeColor"), {
                        backgroundColor: event.params.color,
                        loop: true
                    }, duration);
                }
            }
        });
    }
    var createTimeline = function(eventList) {
        var timeline = new Tone.Timeline();

        eventList.forEach(function(event) {
            timeline.addEvent(event);
        });
        return timeline;
    };
