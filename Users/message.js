$(function() {
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');
    var $feedback = $('#feedback');

    //KeyPressing Event
    $message.keypress(function(e){
        socket.emit('typing',{});
    })

    //Listening Typing.
    socket.on('typing',function(data){
        $feedback.html('<p><em>' + data + ' is typing a message...</em></p>');
    })

    //Submitting The Message.
    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send message',$message.val());
        $message.val('');
    })

    //New Message.
    socket.on('new message',function(data){
        $feedback.html('');
        $chat.append('<div class="well alert alert-dark"><strong>'+data.user+': </strong>'+data.msg+ '</div>')
    })


})