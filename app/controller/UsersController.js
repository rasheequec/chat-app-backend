const express = require('express')
const router = express.Router() 
const { User } = require('../model/User')
const { authenticateUser } = require('../middleware/authentication')

// localhost:3000/users/register
router.post('/register', function(req, res){
    const body = req.body 
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send(user)
        }) 
        .catch(function(err){
            res.send(err)
        }) 
})

// localhost:3000/users/login 
router.post('/login', function(req, res){
    const body = req.body 
    User.findByCredentials(body.email, body.password)
        .then(function(user){
           return user.generateToken()
        })
        .then(function(token){
            res.setHeader('x-auth', token).send({})
        })
        .catch(function(err){
            res.send(err)
        })

})

router.get('/userlist', authenticateUser, function(req, res){
    User.getUserList().then(function(userList){
        res.send(userList)
    }).catch(function(err){
        res.send(err)
    })
})

// localhost:3000/users/account 
router.get('/account',  authenticateUser, function(req, res){
    const { user } = req 
    res.send(user)
})


// localhost:3000/users/logout
router.delete('/logout', authenticateUser, function(req, res){
    const { user, token } = req 
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    usersRouter: router
}