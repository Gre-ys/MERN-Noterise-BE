const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await User.findOne({ email: profile.emails[0].value });
      console.log(user);
      if (user || user != null) return done(null, user);
      const newUser = await User.create({ username: profile.displayName + profile.id, password: profile.id, email: profile.emails[0].value });
      console.log(newUser);
      return done(null, newUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  done(null, user);
});
