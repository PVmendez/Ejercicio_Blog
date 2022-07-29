const express = require("express");
const router = express.Router();
const blogController = require("./controllers/blogController");

//Muestra todos los articulos en la vista HOME
router.get("/", blogController.index);

//Dirige a una vista para agregar un articulo nuevo
router.get("/blog/create", blogController.create);

//Agrega el articulo a la base de datos
router.post("/blog", blogController.store);

//Mostrar articulo de la id
router.get("/blog/:id", blogController.show);

//dirige a la ventana para modificar con la info del usuario eligido
router.get("/blog/edit/:id", blogController.edit);

//metodo para modificar un usuario, en la vista de modificar
router.post("/blog/edit/:id", blogController.update);

//elimina usuario
router.get("/blog/delete/:id", blogController.destroy);

//Admin
router.get("/admin", blogController.admin);

module.exports = router;
