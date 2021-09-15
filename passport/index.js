const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")



const customFields ={
            usernameField: 'username', 
            passwordField: 'password',
            session: true
}


const verifyCallback = ( username, password, done) => {
    User.findOne({ username })
    .then(user => {
        if (!user) {
            return done(null, false, { errorMessage: 'Incorrect username' });
        }
        
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { errorMessage: 'Incorrect password' });
        }
        
        done(null, user);
    })
    .catch(err => done(err));
}


const Strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(Strategy)


        passport.serializeUser((user, cb) => cb(null, user._id));
        
        passport.deserializeUser((id, cb) => {
            User.findById(id)
            .then(user => cb(null, user))
            .catch(err => cb(err));
        });

