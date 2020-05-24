const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    senderId: {
        type: String, 
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

const Message = mongoose.model('Message', messageSchema)


module.exports = {
    Message,
    messageSchema
}