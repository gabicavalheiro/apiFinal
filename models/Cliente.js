import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

import { sequelize } from '../databases/conecta.js';

export const Cliente = sequelize.define('cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false,
   
  },
}, {
  paranoid: true,
  timestamps: false,
});
// Hook (gancho) do Sequelize que é executado antes 
// da inserção de um registro.
// Faz a criptografia da senha e atribui o hash ao campo senha
Cliente.beforeCreate(cliente => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(cliente.senha, salt)
  cliente.senha = hash  
});