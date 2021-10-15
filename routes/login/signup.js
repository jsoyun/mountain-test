const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
// const nodemailer = require('nodemailer');
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { isNotLoggedIn } = require("../middlewares");

const router = express.Router();

/* uploads 폴더 */
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

router.get("/", (req, res, next) => {
  res.render("login/signup", { title: "회원가입" });
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  const { nick, email, pwd, pwdcheck } = req.body;
  let { url } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.send("<script>alert('이미 가입한 이메일 입니다.'); location.href='/signup';</script>");
    }
    if (pwd != pwdcheck) {
      return res.send("<script>alert('비밀번호를 확인해주세요.'); location.href='/signup';</script>");
    }

    const hash = await bcrypt.hash(pwd, 12);
    console.log('이미지' + url);
    if (url == false) {
      console.log(1);
      url = '/img/basic.png';
    }
    console.log(url);
    User.create({
      nick,
      email,
      password: hash,
      img: url,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// uploads 폴더
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

/* multer 기본 설정 */
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
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 프로필 IMG CREATE */
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);

  res.json({ url: `/img/${req.file.filename}` });
});

/* 프로필 TEXT CREATE */
// router.post("/", upload.none(), async (req, res, next) => {
//   try {
//     await User.create({
//       // nick: req.body.nick,
//       img: req.body.url,
//     });
//     res.redirect("/signup");
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

/* 비밀번호 찾기 이메일 전송 */
// router.post("/", function(req, res, next){
//   let email = req.body.email;

//   let transporter = nodemailer.createTransport({
//     service: 'Naver',
//     host: 'smtp.naver.com',
//     auth: {
//       user: process.env.Node_Email,  // gmail 계정 아이디를 입력
//       pass: process.env.Node_Pwd,          // gmail 계정의 비밀번호를 입력
//     }
//   });

//   let mailOptions = {
//     from: process.env.Node_Email,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
//     to: email ,                     // 수신 메일 주소
//     subject: 'Sending Email using Node.js',   // 제목
//     text: 'That was easy!'  // 내용
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     }
//     else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

//   res.redirect("/");
// })

module.exports = router;
