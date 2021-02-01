const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config.json");

const dotenv = require('dotenv')

const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const otpGenerator = require('./otpGenerator');


const lecturesRoutes = require("./routes/lecture");
const workshopsRoutes = require("./routes/workshop");
const teamRoutes = require("./routes/team");
const competitionRoutes = require("./routes/competition");
const sponsorRoutes = require("./routes/sponsor");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/user");

const app = express();


databaseUrl = config.db.url;
mongoose
  .connect(
    databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const hello = '$2b$12$Fn/oeILxMCUKl2lorWc9X.tlZ.LfieUZMk/KiBYnJIUnf3PAKCLNq'
const email = "hello"
const password = "$2b$12$Q2tre2YAjH0guGtcTU.zJOs/WPa7eUcblSIjNegbDyWhwqFSLt2hK"

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/user", userRoutes);
app.use("/api/lectures", lecturesRoutes);
app.use("/api/workshops", workshopsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/dashboards", dashboardRoutes);

module.exports = app;
