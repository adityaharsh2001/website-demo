const express = require("express");
const multer = require("multer");


const Sponsor = require("../models/sponsor");

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

exports.getSponsors = (req, res, next) => {
  Sponsor.find().then(documents => {
    res.status(200).json({
      message: "Sponsors fetched successfully!",
      posts: documents
    });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });;

};


exports.addSponsors = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
    const sponsor = new Sponsor({
      sponsorName: req.body.sponsorName,
      sponsorTitle: req.body.sponsorTitle,
      year: req.body.year,
      link: req.body.link,
      status: req.body.status,
      imagePath: url + "/images/" + req.file.filename
    });

      b = req.body
      sponsor.save().then(createSponsor => {
        res.status(201).json({
          message: "Sponsor added successfully",
          b
        });
      });
};


