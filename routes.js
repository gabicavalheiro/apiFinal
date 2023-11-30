import { Router } from "express"
import { clienteCreate, clienteIndex, clienteLogin } from "./controllers/clienteController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoGraphEstrelas, avaliacaoIndex, dadosGerais, mostrarComentarios } from "./controllers/avaliacaoController.js"
import { roupaCreate, roupaDestaca, roupaDestaques, roupaIndex, roupaShow } from "./controllers/roupaController.js"
import { adicionarAdmin } from "./controllers/loginController.js"

const router = Router()

router.get('/clientes', clienteIndex)
      .post('/clientes', clienteCreate)
      .post('/login', clienteLogin)
      // .post('/loginAdm', adicionarAdmin)

router.get('/roupas', roupaIndex)
      .get('/roupas/destaques', roupaDestaques)
      .post('/roupas', roupaCreate)
      .get('/roupas/:id', roupaShow)
      .patch('/roupas/destaca/:id', roupaDestaca)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/graph', avaliacaoGraphEstrelas)
      .get('/avaliacoes/coments', mostrarComentarios)

router.get('/dados_gerais', dadosGerais)

export default router