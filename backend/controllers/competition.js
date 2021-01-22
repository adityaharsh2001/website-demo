const express = require("express");
const multer = require("multer");


const Competition = require("../models/competition");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

exports.getCompetetions = (req, res, next) => {
  Competition.find().then(documents => {
    res.status(200).json({
      message: "Competitions fetched successfully!",
      posts: documents
    });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });;

};


exports.addCompetitions = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
    const competition = new Competition({
      title: req.body.title,
      description: req.body.description,
      date: {
        "year": req.body.year,
        "month": req.body.month,
        "day": req.body.day,
      },
      regLink: req.body.regLink,
      status: req.body.status,
      imagePath: url + "/images/" + req.file.filename
    });

      b = req.body
      competition.save().then(createCompetition => {
        res.status(201).json({
          message: "Competition added successfully",
          b
        });
      });
};


