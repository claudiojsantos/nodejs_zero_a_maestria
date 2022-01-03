const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodesequelize", "root", "12345678", {
  host: "10.211.55.4",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado no Banco de Dados");
} catch (err) {
  console.log("Não foi possível se conectar no Banco: ", err);
}

module.exports = sequelize;
