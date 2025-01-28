

const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Example: "Admin", "Manager", "Employee"
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true }, // Role is specific to an org
  permissions: [{ type: String }] // Example: ["CREATE_REPORT", "EDIT_REPORT", "DELETE_REPORT"]
});

module.exports = mongoose.model("Role", RoleSchema);
