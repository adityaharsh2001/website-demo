const mongoose = require("mongoose");

const sponsorSchema = mongoose.Schema({
  sponsorName: { type: String, required: true },
  imagePath: { type: String, required: true },
  status: {type: Boolean, required: true},
  sponsorTitle: {type: String, required: true},
  year: {type: String, required: true},
  link: {type: String, required: true},
});

module.exports = mongoose.model("Sponsor", sponsorSchema);