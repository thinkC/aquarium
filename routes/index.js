var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//ABOUT
router.get("/about", function(req, res) {
    res.render("about");
})

//================
//AUTHENTICATION
//================

//Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
           console.log(err);
           req.flash("error", err.message)
           return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome "+ user.username)
            res.redirect("/portfolios");
        })
    })
});

//Login Route
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login Logic
router.post("/login",passport.authenticate("local",
{
    successRedirect : "/portfolios",
    failureRedirect : "/login"
}), function(req, res) {
    
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out!")
    res.redirect("/portfolios");
});

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;