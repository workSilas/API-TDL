import * as bd from '../Repository/tb_vendasRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/tdl/vendas/consulta/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await bd.consultaIdVenda(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/tdl/vendas/consulta/', async (req, resp) => {
    try {
        let registros = await bd.consultaVenda()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/tdl/vendas/inserir/', async (req, resp) => {
    try {
        let venda = req.body
        let id = await bd.inserirVenda(venda)
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

endpoints.put('/tdl/vendas/alterar/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let venda = req.body
        let linhasAfetadas = await bd.alterarVenda(id, venda)
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

endpoints.delete('/tdl/vendas/delete/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.deletarVenda(id)
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