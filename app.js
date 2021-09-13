// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs

const hbs = require("hbs");


const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/User.model.js")
const flash = require("connect-flash")
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app)

// default value for title local
const projectName = "cryptoCoin";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;



//Handling Passport

app.use(flash())
passport.use(
    new LocalStrategy(
        
        {
            usernameField: 'username', 
            passwordField: 'password',
            session: true
        },
        ( username, password, done) => {
            User.findOne({ username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username' });
                }
                
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                
                done(null, user);
            })
            .catch(err => done(err));
        }
        )
        )
        
        
        passport.serializeUser((user, cb) => cb(null, user._id));
        
        passport.deserializeUser((id, cb) => {
            User.findById(id)
            .then(user => cb(null, user))
            .catch(err => cb(err));
        });
        
        
        
        
        app.use(passport.initialize())
        app.use(passport.session());
        
        // 👇 Start handling routes here
        const index = require("./routes/index");
        app.use("/", index);
        
        const auth = require("./routes/auth");
        app.use("/", auth);

        const page = require("./routes/page");
        app.use("/", page);


        // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
        require("./error-handling")(app);

module.exports = app;
