const { sequelize, User, Comment, Article } = require("../models/Model");
const formidable = require("formidable");
const fs = require("fs");
const nodemailer = require("nodemailer");
const slugify = require("slugify");

const blogController = {
  index: async (req, res) => {
    const blogs = await Article.findAll({ order: [["updatedAt", "DESC"]] });
    const orderedBlogs = [];
    for (const data of blogs) {
      orderedBlogs.push(data.dataValues);
    }
    res.render("home", { orderedBlogs });
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
        const slug = slugify(fields.title, {
          replacement: "-",
          lower: true,
          strict: true,
          locale: "en",
          trim: true,
        });

        const blogs = await Article.create({
          title: fields.title,
          content: fields.content,
          slug,
          image: files.image.newFilename,
          date,
          userId: 1,
        });
        res.redirect("/admin");
      }
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "valentino.mendez.rey@gmail.com",
        pass: "njoajdgqcklieggi",
      },
    });

    const articuloname = "Se ha creado un nuevo articulo ✔";
    const listreceivers = [
      "valentino.mendez.rey@gmail.com",
      "mercedestorrendell@gmail.com",
      "sebastianguadalupe00@gmail.com",
    ];

    let info = await transporter.sendMail({
      from: "Remitente",
      to: listreceivers,
      subject: articuloname,
      text: "Articulo nuevo",
      html: "<img src='https://i.eldiario.com.ec/fotos-manabi-ecuador/2019/03/20190312110000_chayanne-visita-ecuador-en-junio.jpg' width='500' height='500'>",
    });

    transporter.sendMail(info, (error, options) => {
      if (error) {
        res.status(500).send(error.message);
      }

      console.log("Email enviado!!!");
      res.status(200).json(req.body);
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
      const slug = slugify(fields.title, {
        replacement: "-",
        lower: true,
        strict: true,
        locale: "en",
        trim: true,
      });
      const update = [
        {
          title: fields.title,
          content: fields.content,
          slug,
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
        const imageName = await Article.findByPk(req.params.id);
        fs.unlinkSync(
          __dirname + "/../public/images/blogs/" + imageName.dataValues.image
        );
        update[0].image = files.image.newFilename;
      } else {
        fs.unlinkSync(files.image.filepath);
      }
      const blog = await Article.update(...update);
      res.redirect("/admin");
    });
  },
  destroy: async function (req, res) {
    const imageName = await Article.findByPk(req.params.id);
    fs.unlinkSync(
      __dirname + "/../public/images/blogs/" + imageName.dataValues.image
    );

    const blogs = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/admin");
  },
  admin: async function (req, res) {
    if (req.isAuthenticated()) {
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
    } else {
      res.redirect("/login");
    }
  },
  comentariosDeArticulo: async (req, res) => {
    let article = await Article.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });
    if (!article) {
      article = await Article.findOne({
        where: { slug: req.params.id },
        include: [User, { model: Comment, include: [User] }],
      });
    }
    if (!article) {
      res.redirect("/blog");
    }
    console.log(article);
    res.render("comments", { article });
  },
  jsonArticles: async (req, res) => {
    const articles = await Article.findAll();
    res.json(articles);
  },
};

module.exports = blogController;
