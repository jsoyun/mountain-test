const { next } = require("cheerio/lib/api/traversing");
const express = require("express");
const path = require("path");
const { Club, User, ClubComment } = require("../../models");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

/* 피드 상세페이지 읽기 */
router.get("/", async (req, res, next) => {
  try {
    res.render("club/clubdetail");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글자료제공 */
router.get("/comment", async (req, res, next) => {
  try {
    const reply = await Club.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nick", "img"],
        },
        {
          model: ClubComment,
          attributes: ["id", "comment", "createdAt"],
          include: {
            model: User,
            attributes: ["id", "nick"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(reply);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글수정 */
router.patch("/commentedit", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await ClubComment.update(
      {
        comment: req.body.comment,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글삭제 */
router.delete("/delete/:id", isLoggedIn, async (req, res, next) => {
  try {
    const result = await ClubComment.destroy({ where: { id: req.params.id } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글추가 */
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const comment = await ClubComment.create({
      clubId: req.body.clubId,
      writerId: req.body.writerId,
      comment: req.body.comment,
    });
    res.send("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
