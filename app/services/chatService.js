const { Chat } = require('../model/Chat')


module.exports = function chatService(server){
    const io = require('socket.io').listen(server);
    console.log("chatservice called");
    io.on("connection", function (socket) {
        console.log("a user connected")
        socket.on('join', function (data) { 
            console.log('join')   
            socket.join(data.userid);
          });

        socket.on('MESSAGE_SEND_REQUEST', (body) => {
            console.log(body);
            Chat.saveMessage(body).then(messageData => {
                socket.emit('RECEIVE_MESSAGE',messageData)
                console.log('success',messageData)
            }).catch(err => {
                console.log('err',err)
            })
          });

          socket.on('disconnect', function(){ 
            console.log("disconnected")
          });
    })
}