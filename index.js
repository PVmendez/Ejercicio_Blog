require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
console.log(app);

app.set("view engine", "ejs");

app.get("/usuarios", (req, res) => {
    res.render("home", { nothing: "hola" })
})
//se va 

app.listen(3000, (req, res) => {
    console.log(`listening in port http://localhost:3000/usuarios`)
})