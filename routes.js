const express = require("express");
const router = express.Router();
const blogController = require("./controllers/blogController");

//Muestra todos los articulos en la vista HOME
router.get("/blog", blogController.index);

//Dirige a una vista para agregar un articulo nuevo
router.get("/blog/crear", blogController.create);

//Agrega el articulo a la base de datos
router.post("/blog", blogController.store);

//Agrega el articulo a la base de datos
router.post("/blog/:id", blogController.show);

//dirige a la ventana para modificar con la info del usuario eligido
router.get("/blog/editar/:id", blogController.edit);

//metodo para modificar un usuario, en la vista de modificar
router.post("/blog/editar/:id", blogController.update);

//elimina usuario
router.get("/blog/eliminar/:id", blogController.destroy);

module.exports = router;
