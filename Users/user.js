$(function(){
    var $userForm = $('#userForm');
    var $userFormArea = $('#userFormArea');
    var $users = $('#users');
    var $username = $('#username');
    var $errorMessage = $('#errorMessage');
    var $messageArea = $('#messageArea');

    $username.keypress(function(e){
        $errorMessage.css("display","none");
    })


    $userForm.submit(function(e){
        e.preventDefault();
        socket.emit('new User',$username.val(),function(data) {
            if(data) {
                $userFormArea.css("display","none");
                $messageArea.show();
            }
        })
        $username.val('');
    })

    socket.on('username Taken',function(data){
        $errorMessage.show();
    })

    socket.on('get users',function(data){
        var html = '';
        for(var i=0;i<data.length;i++) {
            html += '<li class ="alert alert-success">' + data[i] +'</li>';
        }
        $users.html(html);
    })

})