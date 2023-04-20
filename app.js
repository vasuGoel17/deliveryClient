// const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require("./db/conn");
const signups = require("./models/signupschema");
const travels = require("./models/travelschema");
const deliverys = require("./models/deliveryschema");
const app = express();
// app.set("view-engine", "ejs");
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app.get("/", (req, res) => {
//   res.status(201).json("Server start");
// });

app.use(router);
app.listen(PORT, function () {
  console.log(`server is successfully working at port ${PORT}`);
});
