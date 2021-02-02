const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({

  name: { type: String, required: true },
  profession: { type: String, required: true },
  status: {type: String, required: true},
  lectureTitle: {type: String, required: true},
  date:{
    year: {type : String, requied: true},
    month: {type : String, requied: true},
    day: {type : String, requied: true}
  },
  regLink: {type: String, required: true},
  imagePath: { type: String, required: true },
  time: {type: String, required: true},
});


// date: {
//   type: String, required: true
// },

module.exports = mongoose.model("Lecture", lectureSchema);
