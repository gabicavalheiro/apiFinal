import { Roupa } from '../models/Roupa.js'

export const roupaIndex = async (req, res) => {
  try {
    const roupas = await Roupa.findAll()
    res.status(200).json(roupas)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const roupaDestaques = async (req, res) => {
  try {
    const roupas = await Roupa.findAll({ where: { destaque: true } })
    res.status(200).json(roupas)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const roupaDestaca = async (req, res) => {
  const { id } = req.params

  try {
    // posiciona no registro para obter o status atual do campo destaque
    const roupa = await Roupa.findByPk(id)
    // altera com o contrário do atual
    await Roupa.update({ destaque: !roupa.destaque }, { where: { id } })
    res.status(200).json(roupa)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const roupaCreate = async (req, res) => {
  const { nome, marca, preco, cor, foto, descricao} = req.body

  // se não informou estes atributos
  if (!nome || !marca || !preco || !cor || !foto || !descricao ) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const roupa = await Roupa.create({
      nome, marca, preco, cor, foto, descricao
    });
    res.status(201).json(roupa)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const roupaDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await Roupa.destroy({ where: { id } });
    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const roupaShow = async (req, res) => {
  const { id } = req.params

  try {
    const roupa = await Roupa.findByPk(id)
    res.status(200).json(roupa)
  } catch (error) {
    res.status(400).send(error)
  }
}