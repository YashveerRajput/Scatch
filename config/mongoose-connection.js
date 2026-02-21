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
  try {
    const config = require('config');
    mongoURI = `${config.get("MONGODB_URI")}/scatch`;
  } catch (err) {
    console.error("Config error - MongoDB URI not found");
    mongoURI = "mongodb://127.0.0.1:27017/scatch"; // fallback
  }
}

console.log("Attempting to connect to MongoDB...");

mongoose
//pehle mongoose connect krne bolega
.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
})

//agr connect hogya then
.then(function(){
    console.log("✅ Connected to MongoDB successfully");
    dbgr("connected to MongoDB")
})

//agar connect nahi ho rha hai
.catch(function(err){
    console.error("❌ MongoDB connection error:", err.message);
    dbgr(err);                                   
})

// to run the server and connection then we will export the model
module.exports = mongoose.connection