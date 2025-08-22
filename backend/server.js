const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/bloodDonation");
const bloodRequestRoutes = require("./routes/bloodRequests");
const feedbackRoutes = require('./routes/feedbackRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const userHistoryRoutes = require('./routes/userHistory');

dotenv.config();
connectDB();

const app = express();

// CORS setup with specific configuration
const corsOptions = {
  origin: "http://localhost:3000",  // Allow requests from the frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS",  // Allowed methods
  allowedHeaders: "Content-Type, Authorization",  // Allowed headers
  credentials: true,  // Allow cookies/auth headers
};

app.use(cors(corsOptions));  // Apply CORS middleware with the above options

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donate", donationRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);
app.use("/api/blood-stock", donationRoutes);  // This mounts the blood-stock route
app.use('/api/blood-requests', bloodRequestRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/user-history', userHistoryRoutes);

// app.use("/api/donate", donationRoutes);         // Endpoints for donations and blood stock
app.use("/api/requests", bloodRequestRoutes);   
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
