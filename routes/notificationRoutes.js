

const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
