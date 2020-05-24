const express = require('express')
const router = express.Router() 
const { Chat } = require('../model/Chat')
const { authenticateUser } = require('../middleware/authentication')


router.get('/chatlist/:id', authenticateUser, function(req, res){
    const id = req.params.id;
    Chat.getChatList(id).then(function(userList){
        res.send(userList)
    }).catch(function(err){
        res.send(err)
    })
})

module.exports = {
    chatRouter: router
}