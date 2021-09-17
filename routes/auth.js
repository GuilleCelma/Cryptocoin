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

    
    User.findOne({ username }).then((found) => {
       
        if (found) {
          return res
            .status(400)
            .render("auth/singup", { errorMessage: "Username already taken." });
        }
    
        
        return bcrypt
          .genSalt(saltRounds)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashedPassword) => {
           
            return User.create({
              username,
              email,
              password: hashedPassword,
            });
          })
          .then(
            
            res.redirect("/"));
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              return res
                .status(400)
                .render("auth/singup", { errorMessage: error.message });
            }
            if (error.code === 11000) {
              return res.status(400).render("auth/singup", {
                errorMessage:
                  "Username need to be unique. The username you chose is already in use.",
              });
            }
            return res
              .status(500)
              .render("auth/singup", { errorMessage: error.message });
          });
    

})



/* ===============
   LOG IN ROUTES
   =============== */

   router.get("/login", (req,res) =>{
       res.render("auth/login")
   })


   router.post('/login', passport.authenticate('local', {failureRedirect: "/login" , successRedirect: "/home"}))
        

   /* ===============
   LOG OUT ROUTES
   =============== */

   router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

      
module.exports = router