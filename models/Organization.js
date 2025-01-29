

const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    departments: [{ type: String }],
    subscriptionTier: { type: String, enum: ["Free", "Basic", "Pro", "Enterprise"], default: "Free" },
    additionalInfo: { type: Object }
});

module.exports = mongoose.model("Organization", OrganizationSchema);


