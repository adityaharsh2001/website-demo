const mongoose = require("mongoose");

const workshopSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  status: {type: Boolean, required: true},
  price: {type: Number, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  regLink: {type: String, required: true},
});

module.exports = mongoose.model("Workshop", workshopSchema);