const Sequelize = require("sequelize");

module.exports = class ClubComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        clubId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        writerId: {
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
        modelName: "ClubComment",
        tableName: "clubcomments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.ClubComment.belongsTo(db.Club, {
      foreignKey: "clubId",
      targetKey: "id",
    });
    db.ClubComment.belongsTo(db.User, {
      foreignKey: "writerId",
      targetKey: "id",
    });
  }
};
