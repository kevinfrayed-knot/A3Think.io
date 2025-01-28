

const express = require("express");
const Role = require("../models/Role");
const router = express.Router();

// Create a role
router.post("/", async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
