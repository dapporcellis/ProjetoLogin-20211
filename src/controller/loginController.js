const passport = require("../config/passport");

async function abrelogin(req, res) {
  res.render("index.ejs", { msg: req.flash("msg") });
}

const logar = passport.authenticate("local", {
  successRedirect: "/admin/usuario",
  failureRedirect: "/admin",
  failureFlash: true,
});

async function sair(req, res) {
  req.logout();
  req.flash("msg", "Você deslogou do sistema!");
  res.redirect("/admin");
}

module.exports = {
  abrelogin,
  logar,
  sair,
};
