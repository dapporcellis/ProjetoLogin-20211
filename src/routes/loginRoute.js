const express = require("express");
const routes = express.Router();
const loginController = require("../controller/loginController");

//ABRE TELA LOGIN
routes.get("/", loginController.abrelogin);
//LOGAR
routes.post("/", loginController.logar, function (req, res) {
  if (req.body.site !== "") {
    res.redirect(req.body.site);
  } else {
    res.redirect("/admin/usuario");
  }
});

routes.get("/sair", loginController.sair);

module.exports = routes;
