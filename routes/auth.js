const router = require("express").Router()
const mongoose = require("mongoose")
const User = require("../models/User.model.js")
const bcrypt = require("bcryptjs")
const saltRounds = 10
const passport = require("passport")


/* ===============
   SING UP ROUTES
   =============== */

router.get("/singup" , (req,res) => {
    res.render("auth/singup")
})



router.post("/singup", (req, res) =>{

    const {username, email, password} = req.body
    


    if(!username|| !email|| !password){
        res.render("auth/singup", {errorMessage: "All camps are required!"}) //CHECKING IF ALL CAMPS ARE FILLED
        return;
    }

    User.find({username})
    .then(user => {
        if(user !== null){
            res.render("auth/singup", {errorMessage: "User already exist"}) //CHECKING IF USER ALREADY EXIST
        }
        return;
    })

    const hashedPass = bcrypt.hashSync(password, saltRounds) // GENERATING AN ENCRIPTED PASSWORD
    
    User.create({username, email, password:hashedPass})
    .then(res.render("index"))

})



/* ===============
   LOG IN ROUTES
   =============== */

   router.get("/login", (req,res) =>{
       res.render("auth/login",{ errorMessage: req.flash('error') })
   })


   router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        failureFlash: true
      }, (err, theUser, failureDetails) => {

      if (err) {
        // Something went wrong authenticating user
        return next(err);
      }
   
      if (!theUser) {
        // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
        res.render('auth/login', { errorMessage: req.flash('error') });
        return;
      }
   
      // save user in session: req.user
      req.login(theUser, err => {
        if (err) {
          // Session save went bad
          return next(err);
        }
   
        // All good, we are now logged in and `req.user` is now set
        res.redirect('/home');
      });
    })(req, res, next);
  });
module.exports = router