var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',function(socket){
    connections.push(socket);
    console.log('Connection: %s sockets connected' , connections.length );

    socket.on('disconnect',function(data){
        //Disconnect

        users.splice(users.indexOf(socket.username), 1);

        connections.splice(connections.indexOf(socket), 1);
        console.log('DisConnection: %s sockets connected', connections.length );
    })

    //send Message
    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data , user : socket.username});
    })

        //new User
    socket.on('new User',function(data,callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUserNames();
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',socket.username);
    })

    function updateUserNames() {
        io.sockets.emit('get users',users);
    }

})

