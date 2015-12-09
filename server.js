var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); // calling directly
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
    console.log("user connected via socket.io");

    socket.on('joinRoom', function(request){
        clientInfo[socket.id] = request;
        socket.join(request.room);
        socket.broadcast.to(request.room).emit('message', {
            name: 'System',
            text: request.name + ' has joined',
            timestamp: moment().valueOf()
        });
    });

    socket.on('message', function (message){
        console.log('Message received ' + message.text);

        message.timeStamp = moment().valueOf();

        //socket.broadcast.emit('message', message); this will lead to view messages of other users
        io.to(clientInfo[socket.id].room).emit('message', message); // this leads to view messages of the user who wrote it
    });

    // timestamp property - Javascript timestamp (milliseconds)


    socket.emit('message', {
        name: 'System',
        text: 'Welcome to chat application',
        timestamp: moment().valueOf()
    });
});

http.listen(PORT, function () {
    console.log('Server is up');
});