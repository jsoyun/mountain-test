const express = require("express");
const { User, Club } = require("../../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
// const fs = require('fs');
// const app : Express = express();

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.likersCount = req.user ? req.user.length : 0;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((f) => f.id)
    : [];
  next();
});

//프로필 사진 읽기
router.get("/", async (req, res, next) => {
  try {
    const getImage = await User.findOne({
      where: { id: `${req.user.id}` }, // 문자로 바꿈. 아마도. 암튼 개선함
    });
    res.render("mypage/mypage", {
      title: "mountain 커뮤니티",
      signupImages: getImage,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//회원계정 삭제 //가입되지않은 회원이라뜨는데db에는 남아있음..
router.get("/:id/delete", async (req, res, next) => {
  if (confirm("계정을 삭제하시겠습니까?")) {
    try {
      const getID = await User.findOne({ where: { id: `${req.user.id}` } });
      await getID.destroy({ where: { id: `${req.user.id}` } });

      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
});
module.exports = router;
