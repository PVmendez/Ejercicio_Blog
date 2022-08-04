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
        type: DataTypes.STRING(16),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return UserModel;
};
