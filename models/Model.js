const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require('express');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local")

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_CONNECTION,
		logging: false,
	}
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

app.use(
	session({
	secret: "AlgúnTextoSuperSecreto",
	resave: false, // Docs: "The default value is true, but using the default has been deprecated".
	saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
	})
   );

app.use(passport.session());

passport.use (new LocalStrategy({

	
}),(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
	if (err) {
	return done(err);
	}
	if (!user) {
	return done(null, false, { message: "Incorrect username." });
	}
	if (!user.validPassword(password)) {
	return done(null, false, { message: "Incorrect password." });
	}
	return done(null, user);
	});
   }));

   passport.serializeUser(function (user, done) {
	done(null, user.id);
   });
   passport.deserializeUser(function (id, done) {
	User.findByPk(id)
	.then((user) => {
	done(null, user); // Usuario queda disponible en req.user.
	})
	.catch((error) => {
	done(error, user);
	});
   });
   

module.exports = {
	sequelize,
	User,
	Comment,
	Article,
};
