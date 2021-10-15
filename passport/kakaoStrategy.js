const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        //카카오에서 발급해주는 ID. 노출되면 안돼서 process.env.KAKAO_ID로 설정. 나중에 아이디를 발급받아 .env파일에 넣을 것임
        clientID: process.env.KAKAO_ID,
        //카카오로부터 인증결과를 받을 라우터 주소. 아래에서 라우터 작성할 때 이주소 사용
        callbackURL: "/login/kakao/callback",
      },
      //기존에 카카오를 통해 .
      async (accessToken, refreshToken, profile, done) => {

        try {
          //회원가입한 사용자가 있는지 조회
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          //있다면 이미 회원가입되어있는 경우이므로,사용자 정보와 함께 done함수 호출하고 전략 종료.
          if (exUser) {
            done(null, exUser);
          }
          //카카오를 통해 회원가입한 사용자가 없다면, 회원가입 진행.
          //카카오에서는 인증 후 callbackURL에 적힌 주소로 accessToken,refreshToken과 profile을 보낸다. profile에 사용자 정보 들어있음.
          else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
              img: '/img/basic.png',
            });
            //사용자 생성한 뒤 done함수 호출
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
