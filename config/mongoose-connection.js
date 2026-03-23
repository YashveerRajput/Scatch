const mongoose = require('mongoose')
//("development:mongoose") isme apn kuch bhi likh skte hain , yeh bus name hai
const dbgr = require("debug")("development:mongoose")

function getMongoURI() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI.trim();
  }

  try {
    const config = require('config');
    return config.get("MONGODB_URI").trim();
  } catch (err) {
    console.error("Config error - MongoDB URI not found");
    return "mongodb://127.0.0.1:27017";
  }
}

const mongoURI = getMongoURI();
const dbName = process.env.MONGODB_DB || "scatch";
let cachedConnectPromise = null;

function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (cachedConnectPromise) {
    return cachedConnectPromise;
  }

  console.log("Attempting to connect to MongoDB...");
  cachedConnectPromise = mongoose
    .connect(mongoURI, {
      dbName,
      serverSelectionTimeoutMS: 10000,
    })
    .then(function () {
      console.log("✅ Connected to MongoDB successfully");
      dbgr("connected to MongoDB")
      return mongoose.connection;
    })
    .catch(function (err) {
      cachedConnectPromise = null;
      console.error("❌ MongoDB connection error:", err.message);
      dbgr(err);
      throw err;
    });

  return cachedConnectPromise;
}

function getConnectionState() {
  return mongoose.connection.readyState;
}

module.exports = {
  connectDB,
  getConnectionState,
  connection: mongoose.connection,
}