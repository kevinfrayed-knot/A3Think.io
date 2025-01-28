

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User receiving the notification
  message: { type: String, required: true }, // Example: "You were tagged in Report XYZ"
  read: { type: Boolean, default: false }, // Mark as read/unread
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", NotificationSchema);
