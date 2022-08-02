require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const db = require("./db");
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

db();
app.use(routes);

app.listen(APP_PORT, () => {
	console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
	console.log(`[Express] Ingresar a http://localhost:${APP_PORT}/blog.\n`);
});
