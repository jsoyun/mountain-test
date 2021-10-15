const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { User } = require("../../models");

const router = express.Router();
//로그인창 띄우기
router.get("/", (req, res, next) => {
  res.render("login/login", { title: "mountain - 로그인" });
});

//로그인 라우터
router.post("/", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

//로그아웃 라우터
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

//카카오 로그인 라우터
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

/* 구글 */
router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

/* 네이버 */
router.get("/naver", passport.authenticate("naver", { scope: ['profile', 'email'] }));

router.get(
  "/naver/callback",
  passport.authenticate("naver", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
