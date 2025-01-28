

const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

// Create a comment
router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments for a report
router.get("/:reportId", async (req, res) => {
  try {
    const comments = await Comment.find({ report: req.params.reportId }).populate("user");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
