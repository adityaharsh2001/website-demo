const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config.json");

// const postsRoutes = require("./routes/post");
const lecturesRoutes = require("./routes/lecture");
const workshopsRoutes = require("./routes/workshop");
// const competitionRoutes = require("./routes/competition");
// const sponsorRoutes = require("./routes/sponsor");
// const teamRoutes = require("./routes/team");

const app = express();

databaseUrl = config.db.url;
mongoose
  .connect(
    databaseUrl
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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


app.use("/api/lectures", lecturesRoutes);
app.use("/api/workshops", workshopsRoutes);
// app.use("/api/competitions", competitionRoutes);
// app.use("/api/sponsors", sponsorRoutes);
// app.use("/api/team", teamRoutes);

module.exports = app;
