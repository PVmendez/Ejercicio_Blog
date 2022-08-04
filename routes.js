const express = require("express");
const router = express.Router();
const blogController = require("./controllers/blogController");
const commentController = require("./controllers/commentController");
const logeoController = require("./controllers/logeoController");

//Muestra todos los articulos en la vista HOME
router.get("/blog", blogController.index);

//Dirige a una vista para agregar un articulo nuevo
router.get("/blog/create", blogController.create);

//Agrega el articulo a la base de datos
router.post("/blog", blogController.store);

//Mostrar articulo de la id
router.get("/blog/:id", blogController.comentariosDeArticulo);

//Post articulo de la id
router.post("/blog/:id", commentController.postearComentario);

// get editar articulo
router.get("/blog/editar/:id", commentController.editarComentario);

// patch comentarios/editar
router.post("/blog/editar/:id", commentController.guardarCambiosComentario);

// delete editar articulo
router.get("/blog/eliminar/:id", commentController.eliminarComentario);

//dirige a la ventana para modificar con la info del usuario eligido
router.get("/blog/edit/:id", blogController.edit);

//metodo para modificar un usuario, en la vista de modificar
router.post("/blog/edit/:id", blogController.update);

//elimina usuario
router.get("/blog/delete/:id", blogController.destroy);

//Admin
router.get("/admin", blogController.admin);

//Articles en formato json
router.get("/api/articulos", blogController.jsonArticles);

//Rutas passport

//Vista para registrarse el usuario
router.get("/registro", logeoController.index);

//Creacion efectiva del usuario
router.post("/registro", logeoController.create);

// //Para inciar sesion el usuario
router.get("/login", logeoController.indexLogin);

// //Entrada efectiva del usuario a su cuenta
router.get("/login", logeoController.createLogin);

// //Hacer que el cliente salfa de su usuario
// router.get("/logout");

module.exports = router;
