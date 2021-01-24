const express = require("express");
const multer = require("multer");


const Lecture = require("../models/lecture");
const lectureController = require('../controllers/lecture');

// const cloudinary = require("../utils/cloudinary");
// const upload = require("../utils/multer");

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



router.get("", lectureController.getLectures);

router.post("" , multer({ storage: storage }).single("imagePath"), lectureController.addLectures);
// router.post("" , upload.single("image"), lectureController.addLectures);



router.delete("/:id", lectureController.deleteLecture);

router.get("/:id", lectureController.findLecture);


router.put( "/:id", multer({ storage: storage }).single("imagePath") ,lectureController.updateLecture);


module.exports = router;
