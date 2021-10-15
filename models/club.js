const Sequelize = require("sequelize");

/* 클럽 인증 게시글 DB */
module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        hash: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        star: {
          type: Sequelize.INTEGER,
          validate: {
            min: 1,
            max: 5,
          },
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Club",
        tableName: "clubs",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Club.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    db.Club.belongsToMany(db.User, { through: 'Likes' });  // 좋아요
    db.Club.belongsToMany(db.User, { through: "Stars" }); // 별점
    db.Club.belongsToMany(db.Hashtag, { through: 'postHashtag' });
    db.Club.hasMany(db.ClubComment, { foreignKey: "clubId", sourceKey: "id" });
    db.Club.hasMany(db.Img, { foreignKey: "clubImgId", sourceKey: "id" });
    db.Club.belongsToMany(db.Hashtag, { through: 'postHashtag' });
  }
};
