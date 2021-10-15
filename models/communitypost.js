const Sequelize = require("sequelize");     // sequelize 모듈을 불러옴

/* 커뮤니티 게시글 DB */
module.exports = class CommunityPost extends Sequelize.Model {   // 객체 Sequelize 의 Model 을 상속받은 Club 클래스를 module.exports 에 넣어둔다.
  static init(sequelize) {  // 이 범위(init)를 index.js 에서 사용해서 부른다. (여기서 sequelize 는 연결 객체, 말그대로 모델이랑 MySQL 이랑 연결한 것)
    return super.init(
      {
        /* 시퀄라이즈 에서는 주석 부분 자동 생성해준다.
        id : {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        */
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,  // allowNull: faulse 면 NOT NULL
        },
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATEONLY,         // DATE 는 DateOnly
          allowNull: false,
          defaultValue: Sequelize.NOW,    // now() 는 Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,         // DATE 는 DateOnly
          allowNull: false,
          defaultValue: Sequelize.NOW,    // now() 는 Sequelize.NOW
        }
      },
      {
        sequelize,                // sequelize 적어주고, 
        timestamps: false,         // true 이면, 자동으로 createdAt , updatedAt 을 넣어준다.
        underscored: false,       // 시퀄라이즈의 자동으로 만들어주는 글자들을 createdAt 으로 할지(false, 카멜 표기법), created_at 으로 할지(true, 언더바) 물어보는 설정이다.
        modelName: "CommunityPost",        // 모델명은 javascript 에서 쓰이는 이름
        tableName: "communityposts",       // 테이블명은 SQL 에서 쓰이는 이름 (기본적으로 모델명을 소문자화 복수형으로 정한다.)
        paranoid: false,          // true 이면, deletedAt (제거한 날짜)까지 만들어준다. (회원정보는 복구 해달라하므로 제거한 날짜를 기록한다.)
        charset: "utf8mb4",       // 글자형식, mb4 를 추가하면 이모티콘도 가능하다
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {  // 이 범위(associate)를 index.js 에서 사용해서 부른다. 
    db.CommunityPost.belongsTo(db.User);
    db.CommunityPost.belongsToMany(db.User, { through: 'Recommends' });  // 좋아요
    db.CommunityPost.hasMany(db.Communitycomment, { foreignKey: "postId", sourceKey: "id" });
  }
};
