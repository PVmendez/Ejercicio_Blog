module.exports = (sequelize, Model, DataTypes) => {
  class CommentModel extends Model {}

  CommentModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      date: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "comment",
    },
  );

  return Comment;
};
