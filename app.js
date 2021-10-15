////모듈 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./passport");

dotenv.config();

////라우터 추가할때마다 여기도 추가합니다합니다추가합니다.//////////////////////////////////////////////////////////

/* board 폴더 (게시글) */
const communityRouter = require("./routes/board/community");
const editRouter = require("./routes/board/edit");
const searchRouter = require("./routes/board/search");
const viewRouter = require("./routes/board/view");
const writeRouter = require("./routes/board/write");

/* club 폴더 (도전클럽) */
const clubRouter = require("./routes/club/club");
const clubDetailRouter = require("./routes/club/clubdetail");
const clubUploadRouter = require("./routes/club/clubupload");
const clubCommentRouter = require("./routes/club/clubcomments");

/* login 폴더 (로그인) */
const loginRouter = require("./routes/login/login");
const logoutRouter = require("./routes/login/logout");
const signupRouter = require("./routes/login/signup");
const findInfoRouter = require("./routes/login/findinfo");

/* main 폴더 (메인화면) */
const mainRouter = require("./routes/main/main");

/* mountainInfo 폴더 (100대 명산) */
const infoMountainRouter = require("./routes/mountainInfo/infomountain");

/* mypage 폴더 (마이페이지) */
const mypageRouter = require("./routes/mypage/mypage");
const userRouter = require("./routes/mypage/user");
const modifyRouter = require("./routes/mypage/modify");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
passportConfig(); // 패스포트 설정

// view engine setup
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ focus: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
////미들웨어 추가할때마다 여기도 추가//////////////////////////////
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////

/* board 폴더 (게시글) */
app.use("/community", communityRouter);
app.use("/edit", editRouter);
app.use("/search", searchRouter);
app.use("/view", viewRouter);
app.use("/write", writeRouter);

/* club 폴더 (도전클럽) */
app.use("/club", clubRouter);
app.use("/clubupload", clubUploadRouter);
app.use("/clubdetail", clubDetailRouter);
app.use("/clubcomments", clubCommentRouter);

/* login 폴더 (로그인) */
app.use("/findinfo", findInfoRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

/* main 폴더 (메인화면) */
app.use("/", mainRouter);

/* mountainInfo 폴더 (100대 명산) */
app.use("/infomountain", infoMountainRouter);

/* mypage 폴더 (마이페이지) */
app.use("/mypage", mypageRouter);
app.use("/user", userRouter);
app.use("/modify", modifyRouter);

////////////////////////////////////////////////////////////////

/* 404 처리 */
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

/* error 처리 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
