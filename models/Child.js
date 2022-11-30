const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Child extends Model {}

Child.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    child: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    user_name: {
      type: DataTypes.STRING,
    },
    comment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'comment',
          key: 'id',
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'child',
  }
);

module.exports = Child;
