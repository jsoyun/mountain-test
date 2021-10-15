const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = () => {
  //LocalStrategy 생성자의 첫 번째 인수로 주어진 객체는 전략에 관한 설정을 하는 곳
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      //실제 전략을 수행하는 async함수. LocalStrategy생성자의 두번째 인수로 들어감. 첫번째 인수에서 넣어준 email,password는 각각 async함수의 첫번째와두번째 매개변수가됨. 세번째 매개변수인 done함수는 passport.authenticate의 콜백함수임
      async (email, password, done) => {

        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다" });
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};
