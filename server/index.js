var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static('client'));

var messages = [{
    id: 1,
    text: 'Chat hot, you can talk about whatever you want ',
    nickname: 'Bot'
}]
io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+ " se ha conectado al chat...");
    socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

   
})

server.listen(6677, function(){
    console.log("Server is running on http://localhost:6677");
});