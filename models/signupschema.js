const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  verifytoken: {
    type: String,
  },
});

signUpSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

signUpSchema.methods.generateAuthtoken = async function () {
  try {
    const token1 = jwt.sign({ _id: this._id }, process.env.KEYSECRET, {
      expiresIn: "1h",
    });
    this.tokens = this.tokens.concat({ token: token1 });
    await this.save();
    return token1;
  } catch (error) {
    res.status(404).json({ error: "some errors are there" });
  }
};

const signups = mongoose.model("signups", signUpSchema);

module.exports = signups;
