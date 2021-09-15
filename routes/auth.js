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
       res.render("auth/login",)
   })


   router.post('/login', passport.authenticate('local', {failureRedirect: "/login" , successRedirect: "/home"}))
        
      
module.exports = router