const express = require('express')
const router = express.Router() 
const { User } = require('../model/User')
const { authenticateUser } = require('../middleware/authentication')


router.get('/userlist', authenticateUser, function(req, res){
    User.getUserList().then(function(userList){
        res.send(userList)
    }).catch(function(err){
        res.send(err)
    })
})

module.exports = {
    chatRouter: router
}