const Sequelize = require("sequelize");

const dbConfig = require("../config/config.js"); //Aqui precisamos do arquivo de configuração

const Usuario = require("../model/Usuario");

const conexao = new Sequelize(dbConfig);

Usuario.init(conexao);

module.exports = conexao;
