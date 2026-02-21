const mongoose = require('mongoose')
//("development:mongoose") isme apn kuch bhi likh skte hain , yeh bus name hai
const dbgr = require("debug")("development:mongoose")

// MongoDB connection - works for both local development and cloud (Vercel)
let mongoURI;

if (process.env.MONGODB_URI) {
  // Cloud deployment (Vercel) - use environment variable
  mongoURI = `${process.env.MONGODB_URI}/scatch`;
} else {
  // Local development - use config file
  const config = require('config');
  mongoURI = `${config.get("MONGODB_URI")}/scatch`;
}

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