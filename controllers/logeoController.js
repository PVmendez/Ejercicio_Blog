const { sequelize, User, Comment, Article } = require("../models/Model");
const formidable = require("formidable");
const fs = require("fs");
const nodemailer = require("nodemailer");
const slugify = require("slugify");

const logeoController = {
  index: async (req, res) => {
    res.render('register');
  },
  create: async function (req, res) {
    const [user, created] = await User.findOrCreate({
        // Ver opciones en Sequelize.
        });
        if (created) {
        req.login(user, () => res.redirect("/admin"));
        } else {
        res.redirect("back");
        }       
  },
indexLogin: async (req, res) => {
    res.render('login');
  },
  createLogin: async (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/login",
        })
  },
//   store: async function (req, res) {
//     res.redirect();
//   },
//   show: async function (req, res) {
//     const blogs = await Article.findAll();
//     res.render("blog");
//   },
//   edit: async function (req, res) {
//     const blog = await Article.findOne({
//       where: {
//         id: req.params.id,
//       },
//       include: User,
//     });
//     res.render("edit", { blog });
//   },
};

module.exports = logeoController;