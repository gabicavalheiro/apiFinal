import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "projetoFinal", "root", "07052005", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});