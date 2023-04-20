const mongoose = require("mongoose");
const travelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  startlocation: {
    type: String,
    required: true,
  },
  endlocation: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  carname: {
    type: String,
    required: true,
  },
  carnumber: {
    type: String,
    required: true,
  },
});

const travels = mongoose.model("travels", travelSchema);

module.exports = travels;
