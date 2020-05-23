module.exports = function chatService(server){
    const io = require('socket.io').listen(server);
    console.log("chatservice called");
    io.on("connection", function (socket) {
        console.log("a user connected")
        socket.on('join', function (data) { 
            console.log('join')   
            socket.join(data.userid);
          });

          socket.on('disconnect', function(){ 
            console.log("disconnected")
          });
    })
}