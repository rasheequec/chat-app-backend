const { Chat } = require('../model/Chat')


module.exports = function chatService(server){
    const io = require('socket.io').listen(server);
    console.log("chatservice called");
    const onlineUsers = []
    io.on("connection", function (socket) {
        console.log("a user connected",socket.handshake.query.userid)
        const userObj = new Object();
        userObj.userId = socket.handshake.query.userid
        userObj.socketId = socket.id;
        onlineUsers.push(userObj);

        socket.on('MESSAGE_SEND_REQUEST', (body) => {
            console.log(body);
            Chat.saveMessage(body).then(messageData => {
                // socket.to(messageData.senderId).emit('RECEIVE_MESSAGE', 'messageData');
                console.log('send to ',messageData.message.senderId)
                const findSocket = onlineUsers.find(user => {
                  return user.userId == messageData.message.receiverId
                })
                if(findSocket){
                  io.to(findSocket.socketId).emit('RECEIVE_MESSAGE', messageData);
                }
                
            }).catch(err => {
                console.log('err',err)
            })
          });

         socket.on('INITIATE_CALL_EVENT', body => {
           console.log(body)
          const findSocket = onlineUsers.find(user => {
            return user.userId == body.receiverId
          })
          if(findSocket){
            io.to(findSocket.socketId).emit('SOMEONE_CALLING', body);
          }
         })

         socket.on('CALL_ACCEPTED', body => {
           console.log("get")
          console.log(body)
         const findSocket = onlineUsers.find(user => {
           return user.userId == body.userid
         })
         if(findSocket){
           io.to(findSocket.socketId).emit('USER_ACCEPTED_CALL', body);
         }
        })

        socket.on('CALL_REJECTED', body => {
        const findSocket = onlineUsers.find(user => {
          return user.userId == body.id
        })
        if(findSocket){
          io.to(findSocket.socketId).emit('CALL_REJECTED_MESSAGE', `${body.name} rejected your call`);
        }
       })
        

          socket.on('disconnect', function(){
            onlineUsers.forEach((user,i)=>{
              if(user.socketId == socket.id){
                onlineUsers.splice(i,1)
              }
            })
            console.log("disconnected", onlineUsers)
          });
    })
}