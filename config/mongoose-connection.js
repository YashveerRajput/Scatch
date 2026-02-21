const mongoose = require('mongoose')
//("development:mongoose") isme apn kuch bhi likh skte hain , yeh bus name hai
const dbgr = require("debug")("development:mongoose")

const config = require('config')

// MongoDB connection - works for both local development and cloud (Vercel)
const mongoURI = process.env.MONGODB_URI 
  ? `${process.env.MONGODB_URI}/scatch`  // Cloud (MongoDB Atlas)
  : `${config.get("MONGODB_URI")}/scatch`; // Local development

mongoose
//pehle mongoose connect krne bolega
.connect(mongoURI)

//agr connect hogya then
.then(function(){
    dbgr("connected to MongoDB")
})

//agar connect nahi ho rha hai
.catch(function(err){
    console.error("MongoDB connection error:", err);
    dbgr(err);                                   
})

// to run the server and connection then we will export the model
module.exports = mongoose.connection