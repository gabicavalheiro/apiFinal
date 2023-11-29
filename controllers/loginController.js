import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'
dotenv.config()

import { Cliente } from '../models/Cliente.js'


export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body
  // evita de que a mensagem dê "pistas" para um possível invasor
  const mensaErroPadrao = "Erro... Login ou senha inválido"

  if (!email || !senha) {
//    res.status(400).json({ erro: "Informe e-mail e senha de acesso" })
    res.status(400).json({ erro: mensaErroPadrao})
    return
  }

  // verifica se o e-mail está cadastrado
  try {
    const cliente = await Cliente.findOne({ where: { email } })

    if (cliente == null) {
      // res.status(400).json({ erro: "Erro... E-mail inválido" })
      res.status(400).json({ erro: mensaErroPadrao})
      return
    }

    if (bcrypt.compareSync(senha, cliente.senha)) {
      const token = jwt.sign({
        cliente_logado_id: cliente.id,
        cliente_logado_nome: cliente.nome
      },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      )

      res.status(200).json({msg: "Ok. Logado", token})
    } else {

        
      res.status(400).json({ erro: mensaErroPadrao})
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

