const express = require("express");
const multer = require("multer");


const Dashboard = require("../models/dashboard");
const dashboardController = require('../controllers/dashboard');

const router = express.Router();




router.get("", dashboardController.getCount);



module.exports = router;
