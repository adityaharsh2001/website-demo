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
// app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

const usernameHash = '$2b$12$Fn/oeILxMCUKl2lorWc9X.tlZ.LfieUZMk/KiBYnJIUnf3PAKCLNq'
// bcrypt.hash('hello',12,function(err,hash){
//     if(err){
//         console.log(err);
//         process.exit(1);
//     }
//     usernameHash = hash;
//     console.log(usernameHash);
// })

app.use(express.urlencoded({extended:true}));
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
// app.use(express.static(path.join(__dirname,'public')));

app.get('/login',(req,res) => {
    if(req.session.isAuthenticated) res.send('loggedin');
    else if(req.session.isUsernameCorrect) res.send('otp');
    else res.send('username');
});

app.post('/login',(req,res) => {
    //status code 400 => request incorrectly send
    /*status code 200 =>
    0 - already authenticated
    1 - otp correct
    2 - incorrect otp
    3 - correct username
    4 - incorrect username

    */

    const {field} = req.body;
    console.log(req.body);
    console.log(field);
    if(req.session.isAuthenticated){
        //already authenticated;
        res.send('0');
    }else{
        if(!field){
            res.status(400).send('Incorrect request');
            return;
        }
        if(req.session.isUsernameCorrect){
            //otp is to be compared;
            if(req.session.otp === field){
                req.session.isAuthenticated = true;
                res.send('1');
            }else{
                res.send('2');
            }
        }else{
            //username is to be compared
            bcrypt.compare(field,usernameHash,function(err,result){
                if(!result){
                    res.send('4');
                }else{
                    req.session.isUsernameCorrect = true;
                    req.session.otp = otpGenerator();

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: true,
                        auth: {
                          type: "login",
                            user: config.fromMail,    // Set this in environment var
                            pass: config.pass  // Set this in environment var
                        }
                    })

                    const mailOptions = {
                        from: config.fromMail,
                        to: config.toMail,
                        subject: 'Login request',
                        text: `${req.session.otp}`
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) console.log(error)
                    })
                    res.send('3');
                }
            })
        }
    }
});

app.post('/logout',(req,res) => {
    if(req.session.isAuthenticated){
        req.session.destroy();
        res.send('logged out');
    }else{
        res.status(400).send('please login first');
    }
});


app.use("/api/lectures", lecturesRoutes);
app.use("/api/workshops", workshopsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/dashboards", dashboardRoutes);

module.exports = app;
