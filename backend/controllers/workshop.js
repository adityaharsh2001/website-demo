const express = require("express");
const multer = require("multer");


const Workshop = require("../models/workshop");

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

exports.getWorkshops = (req, res, next) => {
  Workshop.find().then(documents => {
    res.status(200).json({
      message: "Workshops fetched successfully!",
      posts: documents
    });
  }).catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });;

};


exports.addWorkshops = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
    const workshop = new Workshop({
      title: req.body.title,
      description: req.body.description,
      date: {
        "year": req.body.year,
        "month": req.body.month,
        "day": req.body.day,
      },
      regLink: req.body.regLink,
      status: req.body.status,
      price: req.body.price,
      imagePath: url + "/images/" + req.file.filename
    });

      b = req.body
      workshop.save().then(createdWorkshop => {
        res.status(201).json({
          message: "Workshop added successfully",
          b
        });
      });
};


