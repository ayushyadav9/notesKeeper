const mongoose = require('mongoose');

const mongoURI = process.env.DB_URL
// const mongoURI = process.env.DB_URL_ATLAS

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Database")
    })
}

module.exports = connectToMongo;