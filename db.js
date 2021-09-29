const mongoose = require('mongoose');

const mongoURI = process.env.DB_URL
// const mongoURI = "mongodb+srv://memyself:125211982662777@inotebook.90qr1.mongodb.net/iNotebook?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Database")
    })
}

module.exports = connectToMongo;