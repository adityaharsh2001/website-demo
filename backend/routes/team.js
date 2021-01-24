const express = require("express");
const multer = require("multer");


const Team = require("../models/team");
const teamController = require('../controllers/team');

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


router.get("", teamController.getTeams);

router.post("" , multer({ storage: storage }).single("imagePath"), teamController.addTeam);

router.delete("/:id", teamController.deleteTeam);

router.get("/:id", teamController.findTeam);


router.put( "/:id", multer({ storage: storage }).single("imagePath") ,teamController.updateTeam);

module.exports = router;
