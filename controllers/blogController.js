const { sequelize, User, Comment, Article } = require("../models/Model");

const blogController = {
	index: async (req, res) => {
		console.log(Article);
		const blogs = await Article.findAll();
		res.render("blog", { blogs });
	},
	create: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
	store: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
	show: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
	edit: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
	update: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
	destroy: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
};

module.exports = blogController;
