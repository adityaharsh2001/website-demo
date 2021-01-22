const express = require("express");
const multer = require("multer");


const Team = require("../models/team");

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

exports.getTeams = (req, res, next) => {
  Team.find().then(documents => {
    res.status(200).json({
      message: "Teams fetched successfully!",
      posts: documents
    });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });;

};


exports.addTeams = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
    const team = new Team({
      name: req.body.name,
      designation: req.body.designation,
      year: req.body.year,
      linkedin: req.body.linkedin,
      contact: req.body.contact,
      imagePath: url + "/images/" + req.file.filename
    });

      b = req.body
      team.save().then(createTeam => {
        res.status(201).json({
          message: "Team added successfully",
          b
        });
      });
};


