
const MongoStore = require("connect-mongo")



module.exports = (app, session) =>{
    app.set('trust proxy', 1)

    app.use(
        session({
          secret: process.env.SESS_SECRET,
          resave: true,
          saveUninitialized: false,
          cookie: {
            sameSite: "none",
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 600000 
          },
          store: MongoStore.create({
            mongoUrl: process.env.DB_REMOTE
          })
        })
      )
}