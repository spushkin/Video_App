const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { errorPrint, successPrint } = require("../helpers/debug/debugprinters");
const sharp = require("sharp");
const multer = require("multer");
const crypto = require("crypto");
const PostError = require("../helpers/error/PostError");
const { route } = require(".");
const { getMostRecentPosts, create, search } = require("../models/Posts");
const { uploadValidation } = require("../middleware/postsmiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/video/upload");
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  },
});

const uploader = multer({ storage: storage });

router.post(
  "/createPost",
  uploader.fields([{ name: "uploadVideo", maxCount: 1 }]),
  uploadValidation,
  (req, res, next) => {
    let obj = Object.entries(Object.entries(req.files)[0][1])[0][1];

    let fileUploaded = obj.path;
    let fileAsThumbnail = `${obj.filename}`;
    let destinationOfThumbNail = obj.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    create(title, description, fileUploaded, destinationOfThumbNail, fk_userId)
      .then((postCreated) => {
        if (postCreated) {
          req.flash("success", "Your post was created successfully");
          successPrint("post was created!");
          res.redirect("/");
        } else {
          throw new PostError("Post couldn't be created", "/postVideo,200");
        }
      })
      .catch((err) => {
        errorPrint("Error: Post couldn't be created");
        if (err instanceof PostError) {
          errorPrint(err.getMessage());
          req.flash("error", err.getMessage());
          res.status(err.getStatus());
          res.redirect("/login");
        } else {
          next(err);
        }
      });
  }
);

/* GET search */
router.get("/search", async (req, res, next) => {
  let searchTerm = req.query.search;

  if (!searchTerm) {
    res.send({
      message: "No search terms given",
      results: [],
    });
  } else {
    let results = await search(searchTerm);
    let userId = req.session.userId;

    results.forEach((result) => {
      if (userId === result.fk_userId) result.deleteBtn = true;
    });

    if (results.length) {
      res.send({
        message: `${results.length} results found`,
        results: results,
      });
    } else {
      let results = await getMostRecentPosts("8");
      res.send({
        message:
          "No results were found from the search but here are 8 the most rescent posts",
        results: results,
      });
    }
  }
});

module.exports = router;
