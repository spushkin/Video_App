const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/routeProtectors").userIsLoggedIn;
const {
  getUserPosts,
  getRecentPosts,
  getPostById,
  getCommentsById,
} = require("../middleware/postsmiddleware");
const db = require("../config/database");

/* GET home page. */
router.get("/", getRecentPosts, function (req, res, next) {
  res.render("index", { title: "Home page" });
});

/* GET profile page. */
router.get("/profile", getUserPosts, function (req, res, next) {
  res.render("index", { title: "Profile" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login page" });
});

/* GET registration page. */
router.get("/registration", function (req, res, next) {
  res.render("registration", { title: "Registration page" });
});

router.use("/postVideo", isLoggedIn);
/* GET postVideo page. */
router.get("/postVideo", (req, res, next) => {
  res.render("postVideo", { title: "Upload page" });
});

/* GET posts page. */
router.get("/post", function (req, res, next) {
  res.render("post");
});

/* GET an individual post page. */
router.get(
  "/post/:id(\\d+)",
  getPostById,
  getCommentsById,
  function (req, res, next) {
    res.render("videopost", {
      title: `Post ${req.params.id}`,
    });
  }
);

module.exports = router;
