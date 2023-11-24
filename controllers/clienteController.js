import bcrypt from 'bcrypt'
import { Cliente } from '../models/Cliente.js'

function validaSenha(senha) {

  const mensa = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

export const clienteIndex = async (req, res) => {

  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const clienteCreate = async (req, res) => {
  const { nome, email, senha } = req.body

  // se não informou estes atributos
  if (!nome || !email || !senha) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const mensaValidacao = validaSenha(senha)
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  }

  try {
    const cliente = await Cliente.create({
      nome, email, senha
    });
    res.status(201).json(cliente)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const clienteLogin = async (req, res) => {

  const { email, senha } = req.body

  try {
    const cliente = await Cliente.findOne({ where: { email } });

    if (cliente == null) {
      res.status(400).json({ erro: 'Login ou senha incorreto' })
      return
    }

    // se encontrado, compara a criptografia da senha armazenada
    // com a criptografia da senha informada
    if (bcrypt.compareSync(senha, cliente.senha)) {
      // se confere, retorna status 200
      res.status(200).json({ id: cliente.id, nome: cliente.nome })
    }
    else {
      res.status(401).json({ erro: 'Login ou senha incorreto' })
      return
    }
  } catch (error) {
    res.status(400).send(error)
  }
}
