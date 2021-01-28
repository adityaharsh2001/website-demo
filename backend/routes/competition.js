const express = require("express");
const multer = require("multer");


const Competition = require("../models/competition");
const competitionController = require('../controllers/competition');

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


router.get("", competitionController.getCompetitions);

router.post("" , multer({ storage: storage }).single("imagePath"), competitionController.addCompetition);

router.delete("/:id", competitionController.deleteCompetiton);

router.get("/:id", competitionController.findCompetiton);


router.put( "/:id", multer({ storage: storage }).single("imagePath") ,competitionController.updateCompetiton);

module.exports = router;
