require("dotenv").config();
const { sequelize, User } = require("./models/Model");
const express = require("express");
const routes = require("./routes");
const db = require("./db");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// db();
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  })
);

app.use(passport.session());
// app.use(passport.initialize());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ email: username }, function (err, user) {
      if (!user) {
        return done(null, false, { message: "Incorrect email o password" });
      }
      if (user.password != password) {
        return done(null, false, { message: "Incorrect email o password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user); // Usuario queda disponible en req.user.
    })
    .catch((error) => {
      done(error, user);
    });
});

app.get("/registro", async (req, res) => {
  res.render("register");
});

app.post("/registro", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;

  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  });
  const [user, created] = await User.findOrCreate({
    where: {
      email: req.body.username,
      firstname: firstname,
      lastname: lastname,
      password: password,
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("/login");
  }
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {}), app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}/blog.\n`);
});
