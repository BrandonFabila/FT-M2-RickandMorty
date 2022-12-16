//(function () {

  const io = require('socket.io-client');//directamente de node modules
  const whiteboard = require('./whiteboard.js');
  let socket = io(window.location.origin);

  //var whiteboard = window.whiteboard;//define variable global, viene de whiteboard.js
  //var socket = window.io(window.location.origin);//requiere a socket.io-client 

  socket.on('connect', function () {
    console.log('Connected!');
  });

  socket.on('load', function (strokes) {

    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });

  });

  socket.on('draw', function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on('draw', function (start, end, color) {
    socket.emit('draw', start, end, color);
  });

//})();




