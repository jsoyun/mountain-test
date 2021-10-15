const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Club, Hashtag, Img } = require("../../models");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* GET page. */
router.get("/", (req, res) => {
  res.render("club/clubupload");
});

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.array("img", 4), (req, res) => {
  // console.log("//////////////////////////////////////////////////////////");
  // console.log(req.files);
  let urlArr = new Array();
  for (let i = 0; i < req.files.length; i++) {
    urlArr.push(`/img/${req.files[i].filename}`);
    console.log(urlArr[i]);
  }
  let jsonUrl = JSON.stringify(urlArr);
  res.json(jsonUrl);
});

router.post("/", isLoggedIn, upload.array("img", 4), async (req, res, next) => {
  try {
    const URL = await req.body.url;
    if (URL == false) {
      return res.send("<script>alert('이미지를 업로드해주세요.'); location.href='/clubupload';</script>");
    }
    if (typeof URL == "object") {
      console.log("오브젝트코드실행")
      const club = await Club.create({
        content: req.body.content,
        hash: req.body.hashtag,
        img: URL[0],
        star: req.body.star,
        userId: req.user.id,
      });

      for (let i = 0; i < (URL.length - 1); i++) {
        await Img.create({
          img: URL[i],
          clubImgId: club.id,
        })
      };

      const hashtags = req.body.hashtag.match(/#[^\s#]*/g);
      console.log(hashtags);
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) => {
            return Hashtag.findOrCreate({
              where: { title: tag.slice(1).toLowerCase() },
            });
          })
        );
        console.log(result);
        await club.addHashtag(result.map((r) => r[0]));
      }
      res.redirect("/club");
      return
    } else {
      console.log("스트링코드실행")
      const club = await Club.create({
        content: req.body.content,
        hash: req.body.hashtag,
        img: URL,
        star: req.body.star,
        userId: req.user.id,
      });
      await Img.create({
        img: URL,
        clubImgId: club.id,
      })
      const hashtags = req.body.hashtag.match(/#[^\s#]*/g);
      console.log(hashtags);
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) => {
            return Hashtag.findOrCreate({
              where: { title: tag.slice(1).toLowerCase() },
            });
          })
        );
        console.log(result);
        await club.addHashtag(result.map((r) => r[0]));
      }
      res.redirect("/club");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
