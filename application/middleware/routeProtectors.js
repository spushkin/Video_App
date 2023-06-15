const { errorPrint, successPrint } = require("../helpers/debug/debugprinters");

const routeProtectors = {};

routeProtectors.userIsLoggedIn = function (req, res, next) {
  if (req.session.username) {
    successPrint("User is logged in");
    next();
  } else {
    errorPrint("User is not logged in");
    req.flash("error", "You must be logged in to create a post");
    res.redirect("/login");
  }
};

routeProtectors.userCanDelete = function (req, res, next) {
  if (req.session.username) {
    successPrint("User can delete");
    next();
  } else {
    errorPrint("User cannot delete this post");
    req.flash("error", "You cant delete a post, please Login");
    res.redirect("/login");
  }
};

module.exports = routeProtectors;
