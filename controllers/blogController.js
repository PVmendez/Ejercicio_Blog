const { sequelize, User, Comment, Article } = require("../models/Model");
const formidable = require("formidable");
const fs = require("fs");

const blogController = {
	index: async (req, res) => {
		const blogs = await Article.findAll();
		res.render("home", { blogs });
	},
	create: async function (req, res) {
		res.render("create");
	},
	store: async function (req, res) {
		const form = formidable({
			multiples: false,
			uploadDir: __dirname + "/../public/images/blogs",
			keepExtensions: true,
			allowEmptyFiles: false,
		});

		form.parse(req, async (error, fields, files) => {
			if (
				!fields.title ||
				!fields.content ||
				!files.image.mimetype.includes("image")
			) {
				res.send("Error al crear articulo, titulo o contenido vacio.");
			} else {
				const date = new Date();
				const blogs = await Article.create({
					title: fields.title,
					content: fields.content,
					image: files.image.newFilename,
					date,
					userId: 1,
				});
				res.redirect("/admin");
			}
		});
	},
	show: async function (req, res) {
		const blogs = await Article.findAll();
		res.render("blog");
	},
	edit: async function (req, res) {
		const blog = await Article.findOne({
			where: {
				id: req.params.id,
			},
			include: User,
		});
		res.render("edit", { blog });
	},
	update: async function (req, res) {
		const form = formidable({
			multiples: false,
			uploadDir: __dirname + "/../public/images/blogs",
			keepExtensions: true,
		});

		form.parse(req, async (error, fields, files) => {
			const date = new Date();
			const update = [
				{
					title: fields.title,
					content: fields.content,
					date,
				},
				{
					where: {
						id: req.params.id,
					},
				},
			];
			if (!fields.title || !fields.content) {
				res.send("Error al editar articulo, titulo o contenido vacio.");
			}
			if (files.image.size !== 0) {
				update[0].image = files.image.newFilename;
			} else {
				fs.unlinkSync(files.image.filepath);
			}
			const blog = await Article.update(...update);
			res.redirect("/admin");
		});
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
		// Renderizo el html de manera asincrona
		const ejs = require("ejs");
		const blogs = await Article.findAll({ include: User, Comment });
		const html = await ejs.renderFile(
			__dirname + "/../views/admin.ejs",
			{ blogs },
			{
				async: true,
			}
		);
		res.send(html);
	},
	comentariosDeArticulo: async (req, res) => {
		const articles = await Article.findOne({ where: { id: req.params.id } });

		if (articles) {
			const comments = await Comment.findAll({
				where: { articleId: req.params.id },
			});
			const user = await User.findOne({ where: { id: articles.userId } });
			res.render("comments", { articles, comments, user });
		} else {
			res.redirect("/");
		}
	},
};

module.exports = blogController;
