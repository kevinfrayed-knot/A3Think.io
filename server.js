

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // User registration & management

// Import API Routes
const reportRoutes = require("./routes/reportRoutes");
const commentRoutes = require("./routes/commentRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const roleRoutes = require("./routes/roleRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

//  Middleware
app.use(cors());
app.use(express.json()); // Use built-in Express JSON parser

//  Register Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

//  Test Route
app.get("/", (req, res) => {
  res.send("A3 Reporting Backend is Running!");
});

//  MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

//  Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
