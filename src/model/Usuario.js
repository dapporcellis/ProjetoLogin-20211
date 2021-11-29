const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        foto: DataTypes.STRING,
        permissao: DataTypes.STRING,
      },
      { sequelize, freezeTableName: true }
    );
  }
}

module.exports = Usuario;
