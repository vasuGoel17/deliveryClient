const express = require("express");
const signups = require("../models/signupschema");
const deliverys = require("../models/deliveryschema");
const travels = require("../models/travelschema");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

router.post("/api/register", async (req, res) => {
  const { username, password, confirmPassword, number } = req.body;
  console.log(username, password, number, confirmPassword);
  if (!username || !confirmPassword || !number || !password) {
    res.status(404).json("please fill the data");
  }
  if (password != confirmPassword) {
    res.status(404).json("Passwords are not matching");
  }
  try {
    console.log("yha aaya");
    const preuserNumber = await signups.findOne({ number: number });
    const preuserName = await signups.findOne({ username: username });

    if (preuserNumber || preuserName) {
      res.status(404).json("this user is already present");
    } else {
      //password hashing
      const newSignUp = new signups({
        username: username,
        number: number,
        password: password,
      });

      const storeSignup = await newSignUp.save();
      res.status(201).json({ status: 201, storeSignup });
    }
  } catch (err) {
    res.status(404).json(err);
    console.log("catched an error during register");
  }
});

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    res.status(404).json("please fill the data");
  }
  try {
    const userValid = await signups.findOne({ username: username });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        console.log("something like password not matching");
        res.status(404).json({ status: 404, error: "Password is incorrect" });
      } else {
        const token = await userValid.generateAuthtoken();
        // console.log(token);
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    } else {
      console.log("username not matching");
      res
        .status(404)
        .json({ status: 404, error: "username is not used till now.." });
    }
  } catch (error) {}
});

router.get("/api/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await signups.findOne({ _id: req.userid });
    res.status(201).json({ status: 201, validuserone });
  } catch (error) {
    res.status(401).json({ status: 401, validuserone });
  }
});

router.get("/api/logout", authenticate, async (req, res) => {
  // console.log("token is: " + req.token);
  // console.log("userid is: " + req.userid);
  // console.log(req.rootuser[0].tokens.length);
  try {
    req.rootuser.tokens = req.rootuser[0].tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });
    // console.log("cookie before: " + usercookie);
    res.clearCookie("usercookie", { path: "/" });
    // console.log("rootuser now is: " + req.rootuser.tokens.length);
    req.rootuser[0].save();
    res.status(201).json({ status: 201, message: "good going" });
  } catch (error) {
    res.status(401).json({ status: 401, message: "not good going" });
  }
});

router.post("/api/event-travel", async (req, res) => {
  const {
    username,
    number,
    name,
    startlocation,
    endlocation,
    date,
    carname,
    carnumber,
  } = req.body;
  console.log("travel: ", req.body);
  if (
    !name ||
    !username ||
    !number ||
    !startlocation ||
    !endlocation ||
    !date ||
    !carname ||
    !carnumber
  ) {
    res.status(400).json({ status: 400, msg: "please fill the data" });
  }
  try {
    const preuserName = await signups.findOne({ username: username });
    if (!preuserName) {
      res.status(400).json({ status: 400, msg: "this user is not present" });
    } else {
      console.log("yha aaya");
      const newTravel = new travels({
        username: username,
        number: number,
        name: name,
        startlocation: startlocation,
        endlocation: endlocation,
        date: date,
        carname: carname,
        carnumber: carnumber,
      });
      const storetravel = await newTravel.save();
      res.status(201).json({ status: 201, storetravel });
    }
  } catch (err) {
    // res.status(404).json(err);
    console.log("catched an error during register");
  }
});

router.post("/api/event-delivery", async (req, res) => {
  const {
    username,
    number,
    name,
    startlocation,
    endlocation,
    date,
    weight,
    size,
  } = req.body;
  console.log("delivery: ", req.body);
  if (
    !name ||
    !number ||
    !username ||
    !startlocation ||
    !endlocation ||
    !date ||
    !weight ||
    !size
  ) {
    res.status(400).json({ status: 400, msg: "please fill the data" });
  }
  try {
    const preuserName = await signups.findOne({ username: username });
    console.log("pu: ", preuserName);
    if (!preuserName) {
      res.status(400).json({ status: 400, msg: "this user is not present" });
    } else {
      console.log("yha aaya");
      const newDelivery = new deliverys({
        username: username,
        number: number,
        name: name,
        startlocation: startlocation,
        endlocation: endlocation,
        date: date,
        weight: weight,
        size: size,
      });
      const storeDelivery = await newDelivery.save();
      res.status(201).json({ status: 201, storeDelivery });
    }
  } catch (err) {
    // res.status(401).json(err);
    console.log("catched an error during register");
  }
});

router.post("/api/getuser", authenticate, async (req, res) => {
  const { username, number } = req.body;
  console.log("kkkakakkakaka: ", username, number);
  try {
    const usersdatad = await deliverys.find({ username: username });
    // const userValid = await signups.findOne({ username: username });
    const usersdatat = await travels.find({ username: username });
    console.log("a: ", usersdatad);
    console.log("b: ", usersdatat);
    res
      .status(200)
      .json({ status: 200, usersdatad: usersdatad, usersdatat: usersdatat });
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

router.get("/api/getuserd", authenticate, async (req, res) => {
  try {
    const usersdatad = await deliverys.find();
    console.log("a: ", usersdatad);
    res.status(200).json({ status: 200, usersdatad: usersdatad });
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

router.get("/api/getusert", authenticate, async (req, res) => {
  try {
    const usersdatat = await travels.find();
    console.log("a: ", usersdatat);
    res.status(200).json({ status: 200, usersdatat: usersdatat });
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

router.post("/api/deleted", async (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  try {
    const usersdatad = await deliverys.deleteOne({ _id: id });
    res.status(200).json({ status: 200, usersdatad: usersdatad });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.post("/api/deletet", async (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  try {
    const usersdatat = await travels.deleteOne({ _id: id });
    res.status(200).json({ status: 200, usersdatat: usersdatat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.post("/api/searcht", async (req, res) => {
  const { start, end } = req.body;
  console.log("start end: ", start, end);
  if (!start || !end) {
    res.status(401).json({ status: 401, err: "data not filled" });
  } else {
    try {
      const show = await travels.find({
        startlocation: start,
        endlocation: end,
      });
      res.status(200).json({ status: 200, show });
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  }
});

router.post("/api/searchd", async (req, res) => {
  const { start, end } = req.body;
  console.log("start end: ", start, end);
  if (!start || !end) {
    res.status(401).json({ status: 401, err: "data not filled" });
  } else {
    try {
      const show = await deliverys.find({
        startlocation: start,
        endlocation: end,
      });
      res.status(200).json({ status: 200, show });
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  }
});

module.exports = router;
