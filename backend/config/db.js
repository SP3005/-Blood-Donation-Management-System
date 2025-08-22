const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  // Ensure that MONGO_URI is available
  if (!process.env.MONGO_URI) {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1);
  }

  try {
    // Add timeout handling and other mongoose options
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
    });

    console.log("MongoDB Connected");

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);  // Exit if connection fails
  }
};

// Graceful exit handling when the process is terminated
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  });
});

module.exports = connectDB;
