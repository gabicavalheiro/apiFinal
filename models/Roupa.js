import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Roupa = sequelize.define('roupa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(9,2),
    allowNull: false
  },
  cor: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  soma: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
  num: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
}, {
  paranoid: true,
  timestamps: false,
});