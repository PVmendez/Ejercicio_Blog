const express = require("express");
const router = express.Router();
const userController = require("./controllers/userControllers");


//Muestra todos los articulos en la vista HOME
router.get('/blog', userController.index);

//Dirige a una vista para agregar un articulo nuevo 
router.get("/blog/crear", userController.create);

//Agrega el articulo a la base de datos 
router.post("/blog", userController.store);

//Agrega el articulo a la base de datos 
router.post("/blog/:id", userController.show);

//dirige a la ventana para modificar con la info del usuario eligido
router.get("/blog/editar/:id", userController.edit);

//metodo para modificar un usuario, en la vista de modificar
router.post("/blog/editar/:id", userController.update);

//elimina usuario
router.get("/blog/eliminar/:id", userController.destroy)


module.exports = router;