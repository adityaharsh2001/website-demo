const express = require("express");
const multer = require("multer");


const Lecture = require("../models/lecture");
const lectureController = require('../controllers/lecture');

const router = express.Router();




router.get("", lectureController.getLectures);

router.post("" , multer({ storage: storage }).single("imagePath"), lectureController.addLectures);






// router.put(
//   "/:id",
//   multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename
//     }
//     const post = new Post({
//       _id: req.body.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: imagePath
//     });
//     console.log(post);
//     Post.updateOne({ _id: req.params.id }, post).then(result => {
//       res.status(200).json({ message: "Update successful!" });
//     });
//   }
// );



// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

module.exports = router;
