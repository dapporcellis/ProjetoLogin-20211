const express = require("express");
const routes = express.Router();
const usuarioController = require("../controller/usuarioController");
const upload = require("../config/multer");

//CREATE
//ABRE ADD
routes.get("/add", usuarioController.abreadd);
//ADD
routes.post("/add", upload.single("foto"), usuarioController.add);

//READ
//LIST
routes.get("/", usuarioController.list);
//LIST FILTRO
routes.post("/", usuarioController.filtro);

//UPDATE
//ABRE EDIT
routes.get("/edt/:id", usuarioController.abreedit);
//EDIT
routes.post("/edt/:id", upload.single("foto"), usuarioController.edit);

//DELETE
routes.get("/del/:id", usuarioController.del);

module.exports = routes;
