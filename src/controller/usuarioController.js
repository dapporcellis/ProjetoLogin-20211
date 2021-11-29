const Usuario = require("../model/Usuario");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { unlink } = require("fs/promises");
const path = require("path");

async function abreadd(req, res) {
  if (req.user.permissao == "super" || req.user.permissao == "admin") {
    res.render("usuario/add.ejs", { logado: req.user });
  } else {
    req.flash(
      "msg",
      "O usuário não tem permissão para Adicionar novos usuários!"
    );
    res.redirect("/admin/usuario");
  }
}

async function add(req, res) {
  let { nome, email, senha, permissao } = req.body;

  const salt = bcrypt.genSaltSync(10);
  senha = bcrypt.hashSync(senha, salt);

  if (req.file != undefined) {
    var foto = req.file.filename;
  }

  await Usuario.create({ nome, email, senha, foto, permissao }).then(
    (usuario) => {
      req.flash(
        "msg",
        "O usuário " + usuario.nome + " foi adicionado com sucesso!"
      );
      res.redirect("/admin/usuario");
    }
  );
}

async function list(req, res) {
  const usuarios = await Usuario.findAll();
  res.render("usuario/list.ejs", {
    Usuarios: usuarios,
    msg: req.flash("msg"),
    logado: req.user,
  });
}

async function filtro(req, res) {
  const pesquisar = req.body.pesquisar;
  const usuarios = await Usuario.findAll({
    where: {
      nome: {
        [Op.iLike]: "%" + pesquisar + "%",
      },
    },
  });
  res.render("usuario/list.ejs", {
    Usuarios: usuarios,
    msg: req.flash("msg"),
    logado: req.user,
  });
}

async function abreedit(req, res) {
  const usuario = await Usuario.findByPk(req.params.id);
  res.render("usuario/edt.ejs", { usuario: usuario, logado: req.user });
}

async function edit(req, res) {
  const usuario = await Usuario.findByPk(req.params.id);
  console.log(req.body.senha);
  if (req.body.senha != "") {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.senha, salt);
    usuario.senha = hash;
  }

  usuario.nome = req.body.nome;
  usuario.email = req.body.email;
  usuario.permissao = req.body.permissao;

  if (req.file != undefined) {
    let diretorio = path.join(__dirname);
    diretorio = path.normalize(
      diretorio + "/../public/uploads/" + usuario.foto
    );
    await unlink(diretorio);
    usuario.foto = req.file.filename;
  }

  usuario.save().then((usuario) => {
    req.flash(
      "msg",
      "O usuario " + usuario.nome + " foi alterado com sucesso!"
    );
    res.redirect("/admin/usuario");
  });
}

async function del(req, res) {
  if (req.user.permissao != "super") {
    req.flash("msg", "O usuário não tem permissão para deletar usuários!");
    res.redirect("/admin/usuario");
  } else {
    const deletar = req.params.id;
    if (deletar == req.user.id) {
      req.flash("msg", "O usuário logado não pode ser deletado!");
      res.redirect("/admin/usuario");
    } else {
      const usuario = await Usuario.findByPk(deletar);
      let diretorio = path.join(__dirname);
      diretorio = path.normalize(
        diretorio + "/../public/uploads/" + usuario.foto
      );
      await unlink(diretorio);
      usuario.destroy().then(() => {
        req.flash("msg", "O usuário foi deletado com sucesso!");
        res.redirect("/admin/usuario");
      });
    }
  }
}

module.exports = {
  abreadd,
  add,
  list,
  filtro,
  abreedit,
  edit,
  del,
};
