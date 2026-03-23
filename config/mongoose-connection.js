const mongoose = require('mongoose')
//("development:mongoose") isme apn kuch bhi likh skte hain , yeh bus name hai
const dbgr = require("debug")("development:mongoose")

function buildMongoURI(rawURI, dbName) {
  if (!rawURI) return "";

  const uri = rawURI.trim();
  const hasQuery = uri.includes("?");

  // If a database path already exists, use it as-is.
  if (/^mongodb(\+srv)?:\/\/[^/]+\/.+/.test(uri)) {
    return uri;
  }

  // Avoid producing "//dbname" when env var ends with '/'.
  const base = uri.replace(/\/+$/, "");
  return hasQuery ? uri : `${base}/${dbName}`;
}

// MongoDB connection - works for both local development and cloud (Vercel)
let mongoURI;

if (process.env.MONGODB_URI) {
  // Cloud deployment (Vercel) - use environment variable
  mongoURI = buildMongoURI(process.env.MONGODB_URI, "scatch");
} else {
  // Local development - use config file
  try {
    const config = require('config');
    mongoURI = buildMongoURI(config.get("MONGODB_URI"), "scatch");
  } catch (err) {
    console.error("Config error - MongoDB URI not found");
    mongoURI = "mongodb://127.0.0.1:27017/scatch"; // fallback
  }
}

console.log("Attempting to connect to MongoDB...");

mongoose
//pehle mongoose connect krne bolega
.connect(mongoURI, {
  serverSelectionTimeoutMS: 10000,
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