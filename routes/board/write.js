const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const { CommunityPost } = require('../../models');
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.get('/', (req, res) => {
  res.render('board/write-community');
});

/* uploads 폴더 */
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_Access_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

/* multer 기본 설정 */
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'wenode',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 게시글 IMG CREATE */
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: req.file.location });
});

/* 게시글 TEXT CREATE */
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    await CommunityPost.create({
      title: req.body.title,
      content: req.body.content,
      views: 0,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect("/community/page?offset=0&limit=5");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;