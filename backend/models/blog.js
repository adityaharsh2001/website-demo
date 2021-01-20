const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  topic: { type: String, required: true },
  writtenBy: { type: String, required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model("Blog", blogSchema);