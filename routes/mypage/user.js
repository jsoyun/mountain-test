const express = require("express");

const { isLoggedIn } = require("../middlewares");
const User = require("../../models/user");

const router = express.Router();
//팔로우
router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//언팔로우
router.post("/:id/unfollow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// //프로필 이미지 일단 넣어봄..
// router.get("/", async (req, res, next) => {
//   try {
//     const posts = await User.findAll({
//       // include: {
//       //   model: User,
//       //   attribute: ['id', 'nick'],
//       // },
//       // order: [['createdAt', 'DESC']],
//       // limit: 5,    // 페이지에 표시될 게시물 수
//     });
//     console.log(posts);
//     res.render("mypage/mypage", {
//       title: "프로필 이미지",
//       signupImage: posts,
//     });

//     console.log();
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;
