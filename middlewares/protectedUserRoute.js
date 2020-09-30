function protectedUserRoute(req, res, next) {
	if (req.session.currentUser && req.session.currentUser.role === "user") {
	  next();
	} else {
	  req.flash("error", "Forbidden");
	  res.redirect("/");
	}
  }
  
  module.exports = protectedUserRoute;