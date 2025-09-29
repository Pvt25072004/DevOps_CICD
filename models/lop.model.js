var mongoose = require("mongoose");
var lop = new mongoose.Schema({
  tenlop: { type: String, required: true },
  chuyennganh: { type: String, required: true },
  gvcn: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("lops", lop);
