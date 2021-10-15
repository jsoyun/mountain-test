const Sequelize = require("sequelize"); // sequelize 모듈을 불러옴
const env = process.env.NODE_ENV || "development"; // .env 파일에 NODE_ENV 정보가 없으면 "development" 을 변수에 저장
const config = require("../config/config")[env]; // ../config/config 안의 env 변수에 저장된 부분을 사용

/* 해당 경로의 DataBase 정보를 변수에 저장 */
const Club = require("./club");
const Hashtag = require("./clubhashtag");
const ClubComment = require("./clubcomments");
const CommunityPost = require("./communitypost");
const User = require("./user");
const Mountain = require("./mountain");
const Img = require("./clubimg");
const Communitycomment = require("./communitycomments");

/* db 객체 선언 */
const db = {};

/* Sequelize 의 객체, 생성자를 sequelize 변수에 저장 */
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/* 바로 위에 선언된 sequelize 변수, db.sequelize 에 저장 */
db.sequelize = sequelize;
/* Sequelize 의 객체/생성자, db.Sequelize 에 저장 */
db.Sequelize = Sequelize;

/* db 객체에 5번째 줄부터 선언된 변수를 각각 db 객체 각각에 저장 */
db.Club = Club;
db.Hashtag = Hashtag;
db.ClubComment = ClubComment;
db.CommunityPost = CommunityPost;
db.User = User;
db.Mountain = Mountain;
db.Img = Img;
db.Communitycomment = Communitycomment;

/* 해당 DB 안의 init 불러서 넣기 (여기서 sequelize 는 연결 객체, 말그대로 모델이랑 MySQL 이랑 연결한 것) */
Club.init(sequelize);
Hashtag.init(sequelize);
ClubComment.init(sequelize);
CommunityPost.init(sequelize);
User.init(sequelize);
Mountain.init(sequelize);
Img.init(sequelize);
Communitycomment.init(sequelize);

/* 해당 DB 안의 associate 불러서 넣기 */
User.associate(db);
Club.associate(db);
Hashtag.associate(db);
ClubComment.associate(db);
CommunityPost.associate(db);
Mountain.associate(db);
Img.associate(db);
Communitycomment.associate(db);

/* module.exports 에 넣기 */
module.exports = db;
