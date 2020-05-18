module.exports = function chatService(server){
    const io = require('socket.io').listen(server);
    console.log("chatservice called");
    io.on("connection", function (socket) {
        console.log("a user connected")
    })
}