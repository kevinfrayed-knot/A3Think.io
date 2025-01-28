

const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Organization Admin
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Employees in the organization
  departments: [{ type: String }], // List of departments
  subscriptionTier: { type: String, enum: ["Basic", "Pro", "Enterprise"], default: "Basic" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Organization", OrganizationSchema);
