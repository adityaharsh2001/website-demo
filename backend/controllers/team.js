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
    cb(error, "backend/images/team/");
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
      teams: documents
    });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });;

};


exports.addTeam = (req, res, next) => {

  const url = req.protocol + "://" + req.get("host");
  try{
    const team = new Team({
      name: req.body.name,
      designation: req.body.designation,
      mailId: req.body.mailId,
      linkedin: req.body.linkedin,
      contact: req.body.contact,
      imagePath: url + "/images/team/" + req.file.filename
    });

      b = req.body
      team.save().then(createTeam => {
        res.status(201).json({
          message: "Team added successfully",
          b
        });
      });
  }
  catch(err){
    console.log(err);
  }

};

exports.deleteTeam = (req, res, next) =>{
  Team.deleteOne({ _id: req.params.id }).then(result => {
    // console.log(result);
    res.status(200).json({ message: "Team deleted!" });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
}

exports.findTeam = (req, res, next) =>{
  // console.log(req.params)
  Team.findById(req.params.id).then(team => {
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: "Team not found!" });
    }
  });
}

exports.updateTeam = (req, res, next) =>{
  let imagePath = req.body.imagePath;
    // console.log(req.file);
    const url = req.protocol + "://" + req.get("host");
    if (req.file) {
      imagePath = url + "/images/team/" + req.file.filename;
    }
    // teamId = req.body._id;
    const team = new Team({
      _id: req.params.id,
      name: req.body.name,
      designation: req.body.designation,
      year: req.body.year,
      linkedin: req.body.linkedin,
      contact: req.body.contact,
      imagePath: url + "/images/team/" + req.file.filename
    });

    // console.log(team);
    // console.log(req.body._id);
    // console.log(req.body);
    // console.log(req.params.id);
    Team.updateOne({ _id:req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }


