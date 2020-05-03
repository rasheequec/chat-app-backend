const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 

const URI = "mongodb+srv://admin:admin@cluster0-gck5n.mongodb.net/test?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        console.log(err);
    });
}


module.exports = {
    connectDB
}