const Sequelize = require("sequelize");

module.exports = class Communitycomment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        commenterId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Communitycomment",
        tableName: "communitycomments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Communitycomment.belongsTo(db.CommunityPost, {
      foreignKey: "postId",
      targetKey: "id",
    });
    db.Communitycomment.belongsTo(db.User, {
      foreignKey: "commenterId",
      targetKey: "id",
    });
  }
};
