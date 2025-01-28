

const express = require("express");
const Report = require("../models/Report");
const router = express.Router();

// Create a new report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("author participants organization");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single report
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("author participants organization");
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a report
router.put("/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a report
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
