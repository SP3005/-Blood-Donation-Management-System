const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/bloodDonation");
const bloodRequestRoutes = require("./routes/bloodRequests");
const feedbackRoutes = require("./routes/feedbackRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userHistoryRoutes = require("./routes/userHistory");

dotenv.config();
connectDB();

const app = express();

/* ======================
   CORS (PRODUCTION SAFE)
====================== */
app.use(
  cors({
    origin: [
      "http://localhost:3000",               // local dev
      "https://*.netlify.app"                // Netlify frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/donate", donationRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user-history", userHistoryRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
