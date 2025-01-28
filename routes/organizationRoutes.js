

const express = require("express");
const Organization = require("../models/Organization");
const router = express.Router();

// Create an organization
router.post("/", async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json(organization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all organizations
router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find().populate("admin users");
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
