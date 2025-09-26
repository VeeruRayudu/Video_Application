const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // return the promise so callers can await/then() it
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err; // let the caller handle exit or retry
  }
};

module.exports = connectDB;
