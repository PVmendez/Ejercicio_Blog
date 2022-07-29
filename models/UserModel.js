module.exports = (sequelize, Model, DataTypes) => {
  class UserModel extends Model {}

  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "user",
    },
  );

  return User;
};
