const Sequelize = require('sequelize');

/* 명산 정보 DB */
module.exports = class Mountain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      mountainlistno: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      height: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      details: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      topdetails: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      imgurl: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Mountain',
      tableName: 'mountains',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {};
};
