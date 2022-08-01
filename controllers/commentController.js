const { User, Comment, Article } = require("../models/Model");

const commentController = {
  postearComentario: async (req, res) => {
    const hoy = Date.now();
    const newComment = await Comment.create({
      content: req.body.comentario,
      date: hoy,
      articleId: req.params.id,
      userId: 1,//req.user.id,
    });

    res.redirect("/blog/" + req.params.id); 
  },
  editarComentario: async (req, res) => {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (comment) {
        res.render("editcomments", { comment: comment });
    } else {
      res.redirect("/");
    }
  },
  guardarCambiosComentario: async (req, res) => {
    const comment = await Comment.findOne({ where: { id: req.params.id } });

    const editedComment = await Comment.update(
      {
        content: req.body.comentario,
      },
      {
        where: { id: req.params.id },
      },
    );

    res.redirect("/blog/" + comment.articleId);
  },
  eliminarComentario: async (req, res) => {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (comment) {
        const destroyComment = await Comment.destroy({ where: { id: req.params.id } }, );
        res.redirect("/blog/" + comment.articleId);
    } else {
      res.redirect("/");
    }
  },
};

module.exports = commentController;