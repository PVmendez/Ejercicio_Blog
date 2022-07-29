module.exports = (sequelize, Model, DataTypes) => {
  class ArticleModel extends Model {}

  ArticleModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      date: { type: DataTypes.DATE },
    },

    {
      sequelize,
      modelName: "article",
    },
  );

  return Article;
};
