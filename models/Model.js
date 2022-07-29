const { Sequelize, Model, DataTypes } = require("sequelize");
const mysql = require("mysql2");
// conexion sql
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("[DataBase] Conexión segura");
  }
});

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  },
);

const User = require("./UserModel")(sequelize, Model, DataTypes);
const Comment = require("./CommentsModel")(sequelize, Model, DataTypes);
const Article = require("./ArticleModel")(sequelize, Model, DataTypes);

User.hasMany(Article);
Article.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
