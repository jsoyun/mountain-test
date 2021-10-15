const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true, // unique: true - 고유하게
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Club, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.CommunityPost);
    db.User.hasMany(db.Communitycomment, { foreignKey: "commenterId", sourceKey: "id" });
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
    db.User.belongsToMany(db.CommunityPost, {
      through: "Recommends",
      as: "recommenders",
    }); // 좋아요
    db.User.belongsToMany(db.Club, { through: "Likes", as: "Likers" }); // 좋아요
    db.User.belongsToMany(db.Club, { through: "Stars", as: "Start" }); // 별점
    db.User.hasMany(db.ClubComment, {
      foreignKey: "writerId",
      sourceKey: "id",
    });
  }
};
