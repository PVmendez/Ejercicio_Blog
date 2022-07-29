require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
console.log(port);

console.log(app);

app.set("view engine", "ejs");

app.get("/usuarios", (req, res) => {
    res.render("home", { nothing: "hola" })
})
//se va 

app.listen(port, (req, res) => {
    console.log(`listening in port http://localhost:${port}/usuarios`)
})

const express = require("express");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/articulo/:id', (req, res) => {
    res.render('blog');
})

app.listen(APP_PORT, () => {
    console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
    console.log(`[Express] Ingresar a http://localhost:${APP_PORT}/articulo.\n`);
});
