import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "projetoFinal", "root", "dode2511", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});