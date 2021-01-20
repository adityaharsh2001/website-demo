const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  imagePath: { type: String, required: true },
  linkedin: {type: String, required: true},
  mailId: {type: String, required: true},
  contact: {type: Number, required: true}
});

module.exports = mongoose.model("Team", teamSchema);