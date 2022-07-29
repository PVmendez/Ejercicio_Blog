const { sequelize, User, Comment, Article } = require("../models/Model");

const blogController = {
	index: async (req, res) => {
		console.log(Article);
		const blogs = await Article.findAll();
		res.render("home", { blogs });
	},
	create: async function (req, res) {
		res.render("create");
	},
	store: async function (req, res) {
		console.log(req.body);
		const { title, content, image } = req.body;
		const date = new Date();
		const blogs = await Article.create({ title, content, image, date });
		res.redirect("/admin");
	},
	show: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("");
	},
	edit: async function (req, res) {
		const blog = await Article.findByPk(req.params.id);
		res.render("edit", { blog });
	},
	update: async function (req, res) {
		const { title, content, image } = req.body;
		const date = new Date();
		const blog = await Article.update(
			{ title, content, image, date },
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.redirect("/admin");
	},
	destroy: async function (req, res) {
		const blogs = await Article.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.redirect("/admin");
	},
	admin: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("admin", { blogs });
	},
};

module.exports = blogController;
