


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

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
app.use(bodyParser.json());

//  Register Routes (Place Here)
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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

//  Start Server (Keep at the Bottom)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

