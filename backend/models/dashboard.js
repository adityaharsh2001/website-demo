const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  LectureCount: { type: String, required: true },
  WorkshopCount: { type: String, required: true },

  CompetitionsCount: { type: String, required: true },
  TeamCount: { type: String, required: true },
  sponsorCount:{ type: String, required: true }

});

module.exports = mongoose.model("Dashboard", dashboardSchema);
