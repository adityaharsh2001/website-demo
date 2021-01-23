const express = require("express");
const multer = require("multer");


const Sponsor = require("../models/sponsor");
const sponsorController = require('../controllers/sponsor');

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


router.get("", sponsorController.getSponsors);

router.post("" , multer({ storage: storage }).single("imagePath"), sponsorController.addSponsor);

router.delete("/:id", sponsorController.deleteSponsor);

router.get("/:id", sponsorController.findSponsor);


router.put( "/:id", multer({ storage: storage }).single("imagePath") ,sponsorController.updateSponsor);

module.exports = router;