const bcrypt = require("bcryptjs");

module.exports = (sequelize, Model, DataTypes) => {
  class UserModel extends Model {}

  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      profileimg: {
        type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: { type: DataTypes.STRING },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      hooks: {
        beforeBulkCreate: async (users, options) => {
          for (const user of users) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    }
  );

  return UserModel;
};
