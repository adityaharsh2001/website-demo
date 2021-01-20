const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  reason: { type: String, required: true },
  message: { type: String, required: true },
  name: { type: String, required: true },
  email: {type: String, required: true},
  feedback: {type: String, required: true},
});

module.exports = mongoose.model("Contact", contactSchema);