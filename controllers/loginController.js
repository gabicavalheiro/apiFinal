import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

import { Cliente } from '../models/Cliente.js'
import { Admin } from '../models/Admin.js'


export const adicionarAdmin = async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    // Verifica se o e-mail já está cadastrado
    const emailExistente = await Admin.findOne({ where: { email } });

    if (emailExistente) {
      res.status(400).json({ erro: 'E-mail já cadastrado' });
      return;
    }

    // Hash da senha
    const senhaHash = bcrypt.hashSync(senha, 10);

    // Cria um novo administrador
    const novoAdmin = await Admin.create({
      nome,
      email,
      senha: senhaHash,
      isAdmin: true, // Marca o novo usuário como administrador
    });

    res.status(201).json({ msg: 'Administrador adicionado com sucesso', id: novoAdmin.id });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { email } });

    if (cliente == null) {
      res.status(400).json({ erro: mensaErroPadrao });
      return;
    }

    if (bcrypt.compareSync(senha, cliente.senha)) {
      const token = jwt.sign(
        {
          cliente_logado_id: cliente.id,
          cliente_logado_nome: cliente.nome,
      },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      )
      
        res.status(200).json({ msg: 'Usuário logado', token });
      
    } else {
      res.status(400).json({ erro: mensaErroPadrao });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};