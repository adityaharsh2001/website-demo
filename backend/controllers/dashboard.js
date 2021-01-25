const express = require("express");
const multer = require("multer");


const Dashboard = require("../models/dashboard");
const lecture = require("../models/lecture");
const Competition = require("../models/competition");
const Sponsor = require("../models/sponsor");
const Team = require("../models/team");
const Workshop = require("../models/workshop");





const router = express.Router();



exports.getCount = async (req, res, next) => {

  const workshopCount = await Workshop.countDocuments();
  const lectureCount = await lecture.countDocuments();
  const teamCount = await Team.countDocuments();
  const competitionCount = await Competition.countDocuments();
  const sponsorCount = await Sponsor.countDocuments();



    res.status(200).json({
      message: "Count fetched successfully!",
      number: {
        WorkshopCount: workshopCount,
        LectureCount: lectureCount,
        SponsorCount: sponsorCount,
        CompetitionsCount: competitionCount,
        TeamCount: teamCount
      }

    });

};





