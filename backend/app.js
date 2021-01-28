const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config.json");

const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const otpGenerator = require('./otpGenerator');

// const postsRoutes = require("./routes/post");
const lecturesRoutes = require("./routes/lecture");
const workshopsRoutes = require("./routes/workshop");
const teamRoutes = require("./routes/team");
const competitionRoutes = require("./routes/competition");
const sponsorRoutes = require("./routes/sponsor");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

const usernameHash = '$2b$12$Fn/oeILxMCUKl2lorWc9X.tlZ.LfieUZMk/KiBYnJIUnf3PAKCLNq';

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

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use("/images", express.static(path.join("backend/images")));

app.use(session({
  secret: 'secret',
  resave: false,
  name: 'session',
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      maxAge: 1000*60*60
  }
}));
app.use(flash());

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

// app.use((req,res,next) => {
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// });

// app.get('/login',(req,res) => {
//   if(req.session.isAuthenticated === true){
//       //already authenticated
//       res.send('already logged in');
//   }else{
//       //not authenticated
//       if(req.session.isUsernameCorrect === true) res.render('confirm');
//       else
//       res.render('login');
//   }
// });

// app.post('/login',(req,res) => {
//   const {username,otp} = req.body;
//   if(username){
//       bcrypt.compare(username,usernameHash,function(err,result){
//           if(result){
//               req.session.isUsernameCorrect = true;
//               req.flash('success','Username is correct');

//               //generate otp and set it to req.session.otp
//               req.session.otp = otpGenerator();

//               const transporter = nodemailer.createTransport({
//                   service: 'gmail',
//                   secure: true,
//                   auth: {
//                       user: nodemailerConfig.fromMail,    // Set this in environment var
//                       pass: nodemailerConfig.pass  // Set this in environment var
//                   }
//               })

//               const mailOptions = {
//                   from: nodemailerConfig.fromMail,
//                   to: nodemailerConfig.toMail,
//                   subject: 'Login request',
//                   text: `${req.session.otp}`
//               }

//               transporter.sendMail(mailOptions, (error, info) => {
//                   if (error) req.flash('error','Unable to send the OTP');
//               })
//           }else req.flash('error','Username is incorrect');
//           res.redirect('/login');
//       });
//   }
//   if(otp){
//       if(req.session.otp === otp){
//           //login successfull
//           req.session.isAuthenticated = true;
//           res.send('logged in');
//       }else{
//           //wrong otp
//           req.session.isUsernameCorrect = false;
//           req.flash('error','Incorrect OTP');
//           res.redirect('/login');
//       }
//   }
// });

// app.get('/logout',(req,res) => {
//   req.session.destroy();
//   res.redirect('/login');
// });

// app.use((req,res,next) => {
//   // console.log(req.session);
//   if(req.session.isAuthenticated === true) next();
//   else res.status(403).send('forbidden');
// })

app.use("/api/lectures", lecturesRoutes);
app.use("/api/workshops", workshopsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/dashboards", dashboardRoutes);

module.exports = app;
