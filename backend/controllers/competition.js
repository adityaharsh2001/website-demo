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
    cb(error, "backend/images/competition");
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

exports.getCompetitions = (req, res, next) => {
  Competition.find().then(documents => {
    res.status(200).json({
      message: "Competitions fetched successfully!",
      competitions: documents
    });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });;

};


exports.addCompetition = (req, res, next) => {
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
      imagePath: url + "/images/competition/" + req.file.filename,
      time: req.body.time
    });

      b = req.body
      competition.save().then(createCompetition => {
        res.status(201).json({
          message: "Competition added successfully",
          b
        });
      });

};

exports.deleteCompetiton = (req, res, next) =>{
  Competition.deleteOne({ _id: req.params.id }).then(result => {
    // console.log(result);
    res.status(200).json({ message: "Competition deleted!" });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
}

exports.findCompetiton = (req, res, next) =>{
  // console.log(req.params)
  Competition.findById(req.params.id).then(competiton => {
    if (competiton) {
      res.status(200).json(competiton);
    } else {
      res.status(404).json({ message: "Competition not found!" });
    }
  });
}

exports.updateCompetiton = (req, res, next) =>{
  let imagePath = req.body.imagePath;
    // console.log(req.file);
    const url = req.protocol + "://" + req.get("host");
    if (req.file) {
      imagePath = url + "/images/competition/" + req.file.filename;
    }
    // competitonId = req.body._id;
    const competiton = new Competiton({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      date: {
        "year": req.body.year,
        "month": req.body.month,
        "day": req.body.day,
      },
      regLink: req.body.regLink,
      status: req.body.status,
      imagePath: url + "/images/competition/" + req.file.filename,
      time: req.body.time
    });


    Competiton.updateOne({ _id:req.params.id }, competiton).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }



