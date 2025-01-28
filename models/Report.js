const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users assigned to this report
  dateCreated: { type: Date, default: Date.now },
  theme: { type: String, required: true },
  background: { type: String },
  backgroundImage: { type: String }, // Image URL for Background
  currentConditions: { type: String },
  currentConditionsImage: { type: String },
  goals: { type: String },
  goalsImage: { type: String },
  rootCauseAnalysis: { type: String },
  rootCauseAnalysisImage: { type: String },
  countermeasures: { type: String },
  countermeasuresImage: { type: String },
  actionPlan: { type: String },
  actionPlanImage: { type: String },
  followUp: { type: String },
  followUpImage: { type: String },
  status: { type: String, enum: ["Draft", "In Review", "Completed"], default: "Draft" },
});

module.exports = mongoose.model("Report", ReportSchema);
