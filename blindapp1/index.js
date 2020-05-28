var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(process.env.PORT ||4000, function(){
    console.log('listening for requests on port 4000,app.address().port');
});

var io = socket(server);
app.use(express.static('public'));



io.on('connection', function(socket){
    console.log('made connection',socket.id);
    socket.on('chat', function(data){        
        socket.broadcast.emit('chat', data);        
    });
});