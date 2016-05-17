app.controller('ChatController', function (socket, $stateParams, $sanitize, $ionicScrollDelegate, $timeout) {
  var self = this;
  var typing = false;
  var lastTypingTime;
  var typingTimerLength = 400;

  var colors = [
	    '#e21400', '#91580f', '#f8a700', '#f78b00',
	    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	  ];


  self.messages = [];

  socket.on('connect', function () {

    socket.emit('new message', 'Hi Socket IO is awesome');
    socket.emit('add user', $stateParams.nickname);
    socket.on('login', function (data) {

      self.connected = true;
      self.numberMessage = messageString(data.numUsers);

    });

    socket.on('new message', function (data) {
      if (data.message && data.username)
        addMessageToList(data.username, true, data.message);
    });

    socket.on('user joined', function (data) {
      addMessageToList('', false, data.username + ' joined');
      addMessageToList('', false, messageString(data.numUsers));
    });

    socket.on('user left', function (data) {
      addMessageToList('', false, data.username + ' left');
      addMessageToList('', false, messageString(data.numUsers));
    });

    socket.on('typing', function (data) {
      addChatTyping(data);
    });

    socket.on('stop typing', function (data) {
      removeChatTyping(data.username);
    });

  })


  self.sendMessage= function () {
		socket.emit('new message', self.message);
		addMessageToList($stateParams.nickname,true,self.message);
		socket.emit('stop typing');
		self.message = "";
  }


  function addMessageToList (username, style_type, message) {
    username = $sanitize(username); // the input is sanitized
    var color = style_type ? getUsernameColor(username) : null; // get color for user
    self.messages.push({ content: $sanitize(message), style: style_type, username: username, color: color }); // Push the messages to the messages list.
    $ionicScrollDelegate.scrollBottom(); //$ionicScrollDelegate scrolls to bottom, so user reads most recent message
  }

  function messageString (numUsers) {
    return numUsers === 1 ? 'there"s 1 participant' : 'there are ' + numUsers + ' participants';
  }

  function addChatTyping (data) {
    addMessageToList(data.username, true, ' is typing');
  };

  // function removeChatTyping (username) {
  //   self.messages = self.messsages.filter(function (element) {
  //     return element.username != username || element.content != ' is typing';
  //   });
  // }

  function removeChatTyping (username) {
	  	self.messages = self.messages.filter(function(element){return element.username != username || element.content != ' is typing'})
	}



  function sendUpdateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
    }
    lastTypingTime = (new Date()).getTime();
    $timeout(function () {
      var typingTimer = (new Date()).getTime();
      var timeDiff = typingTimer - lsatTypingTime;
      if (timeDiff >= typerTimingLength && typing) {
        socket.emit('stop typing');
        typing = false;
      }
    }, typerTimingLength)
  }

  function getUsernameColor (username) {
	    // Compute hash code
	    var hash = 7;
	    for (var i = 0; i < username.length; i++) {
	       hash = username.charCodeAt(i) + (hash << 5) - hash;
	    }
	    // Calculate color
	    var index = Math.abs(hash % colors.length);
	    return colors[index];
  	}

})
