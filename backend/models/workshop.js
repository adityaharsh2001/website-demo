const mongoose = require("mongoose");

const workshopSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  status: {type: String, required: true},
  price: {type: String, required: true},
  date:{
    year: {type : String, requied: true},
    month: {type : String, requied: true},
    day: {type : String, requied: true}
  },
  regLink: {type: String, required: true},
  time: {type: String, required: true},
});

module.exports = mongoose.model("Workshop", workshopSchema);

// date: {type: String, required: true},
