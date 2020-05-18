const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Message } = require('./Message')

const chatSchema = new Schema({
    _id: {
        type: String, 
        required: true
    },
    messages: [Message],
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
    }
})

const Chat = mongoose.model('Chat', chatSchema)


module.exports = {
    Chat
}