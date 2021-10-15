const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;

const User = require("../models/user");

module.exports = () => {
    passport.use(
      new NaverStrategy({
        clientID: process.env.Naver_ID,
        clientSecret: process.env.Naver_secret,
        callbackURL: "/login/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
      try { 
        console.log(profile);
        const exUser = await User.findOne({
          where: { snsId: profile.id, provider: "naver" },
        });
        if(exUser) {
          done(null, exUser);
        } else {
          const newUser = await User.create({
            provider : profile.provider,
            snsId : profile.id,
            nick : '손님',
            email : profile.emails[0].value,
            img: '/img/basic.png',
        });
          done(null, newUser);
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }));
  }
  