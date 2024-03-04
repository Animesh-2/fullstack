const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  category: { type: String, require: true }, //(any one of these categories only parking, covid, maintenance)
  date: { type: String, require: true },
});

const noticemodel = mongoose.model("notice", noticeSchema);

module.exports = { noticemodel };
