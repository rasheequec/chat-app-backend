const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { messageSchema, Message } = require('./Message')
const { User } = require('./User')

const chatSchema = new Schema({
    _id: {
        type: String, 
        required: true
    },
    messages: [messageSchema],
    name: {
        type: String,
        default: null
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: {
        type: Array,
        required: true
    },
    typingUsers: {
        type: Array,
        default: []
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

chatSchema.statics.saveMessage = async function(messageData){
    // const Chat = this;
    const _id = messageData.senderId+messageData.receiverId.split('').sort().join('');
    const messages = new Message(messageData)

    const findChat = await Chat.findOne({_id})
    if(findChat){
    findChat.messages.push(messages)
    console.log('find chat', findChat)
    return findChat.save().then(user => {
        console.log('after save', user)
        return Promise.resolve(messages)
    }).catch(err => {
        return Promise.reject(err)
    })
    }
    else{
        console.log('not find')
    const body={}
    body.messages = messages
    body._id = messageData.senderId+messageData.receiverId.split('').sort().join('')
    body.users = [messageData.senderId, messageData.receiverId]
    const result = new Chat(body)
    return result.save()
    .then(function(user){
        return Promise.resolve(messages)
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}
}

chatSchema.statics.getChatList = id => {
let chatFilter = []
let userList = []
   return Chat.find({}).then(async chatData => {
        let list = await User.find({})        
        list.forEach(function(user){
         if (user._id !== id){
            userList.push({
                username: user.username,
                email: user.email,
                id: user._id,
                messages: []
            })
         }
      })
      
      chatFilter = chatData.filter(data => {
          return data.users.includes(id)
      })
      userList.forEach((user, i) => {
          chatFilter.forEach(chat => {
              if(chat.users.includes(user.id)){
                userList[i].messages = chat.messages
              }
          })
      })
      return Promise.resolve(userList)
    }).catch((err)=>{
        return Promise.reject(err)
    });
}


const Chat = mongoose.model('Chat', chatSchema)


module.exports = {
    Chat
}