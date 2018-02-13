module.exports = function(io,socket) {
    //Send Message
    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data , user : socket.username});
    })

    //Typing Message
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',socket.username);
    })

}