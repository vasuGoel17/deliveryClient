const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// name, startlocation, endlocation, date, weight, size
const deliverySchema = new mongoose.Schema({
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
  weight: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const deliverys = mongoose.model("deliverys", deliverySchema);

module.exports = deliverys;
