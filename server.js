var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); // calling directly

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log("user connected via socket.io");

    socket.on('message', function (message){
        console.log('Message received ' + message.text);

        //socket.broadcast.emit('message', message); this will lead to view messages of other users
        io.emit('message', message); // this leads to view messages of the user who wrote it
    });

    socket.emit('message', {
        text: 'Welcome to chat application'
    });
});

http.listen(PORT, function () {
    console.log('Server is up');
});