const express = require('express');
const app = express(); 
const { connectDB } = require('./config/db');
const { usersRouter } = require('./app/controller/UsersController')
// const { router } = require('./config/routes');
const port = process.env.Port || 3000; 
app.use(express.json());
connectDB()
app.use('/user', usersRouter)
// app.use('/', router); 

app.listen(port, () => {
    console.log('listening on port', port);
})