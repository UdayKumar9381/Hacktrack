const mongoose = require('mongoose');
require('dotenv').config(); // This loads variables from the .env file

const connectDB = async () => {
  try {
    // MongoDB URI will be fetched from the environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI); // Fetch the MONGO_URI from the .env file
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
