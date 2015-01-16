var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usernames = [];
var countUser = 0;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  var current_user; // set semi-global variable
  io.emit('countUser', countUser);

  // If user is connected and has a username assigned
  socket.on('login', function(username) {
    current_user = username;

    countUser++;
    usernames.push(current_user);
    io.emit('countUser', countUser);
    io.emit('usernames', usernames.sort());
    console.log(usernames);
  });

  socket.on('chat message', function(data){
    var now = new Date();
    now = now.getHours() + ':' + now.getMinutes();
    io.emit('chat message', data.username, data.color, now, data.msg);
  });

  socket.on('disconnect', function(){
    io.emit('disconnected', current_user);
    removeA(usernames, current_user);
    io.emit('countUser', usernames.length);
    countUser = usernames.length;
    console.log('user disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}