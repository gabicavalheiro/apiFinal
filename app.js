import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Cliente } from './models/Cliente.js'
import { Avaliacao } from './models/Avaliacao.js'
import { Roupa } from './models/Roupa.js'
import { Admin } from './models/Admin.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');
    await Admin.sync()
    await Cliente.sync()
    await Roupa.sync()
    await Avaliacao.sync()

  
  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API Projeto Final - Shopping')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})