const express = require('express');
const app = express(); 
var cors = require('cors');
const { connectDB } = require('./config/db');
const { usersRouter } = require('./app/controller/UsersController');
const { chatRouter } = require('./app/controller/chatConroller');
const chatService = require('./app/services/chatService');


const port = process.env.Port || 3001;
app.use(cors())
app.use(express.json());
connectDB()

app.use('/user', usersRouter)
app.use('/chat', chatRouter)
var server = app.listen(3003);
chatService(server)

app.listen(port, () => {
    console.log('listening on port', port);
})