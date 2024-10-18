import * as bd from '../Repository/tb_produtosRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/tdl/produtos/consulta/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await bd.consultaIdProduto(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/tdl/produtos/consulta/', async (req, resp) => {
    try {
        let registros = await bd.consultaProduto()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/tdl/produtos/inserir/', async (req, resp) => {
    try {
        let produto = req.body
        let id = await bd.inserirProduto(produto)
        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/tdl/produtos/alterar/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let produto = req.body
        let linhasAfetadas = await bd.alterarProduto(id, produto)
        if (linhasAfetadas >= 1) {
            resp.send()
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado.' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/tdl/produtos/delete/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.deletarProduto(id)
        if (linhasAfetadas >= 1) {
            resp.send()
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado.' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;