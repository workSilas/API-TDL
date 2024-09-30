import * as bd from '../Repository/produtoRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/pizzaria/consulta/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await bd.consultaIdPizzaria(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/pizzaria/consulta/', async (req, resp) => {
    try {
        let registros = await bd.consultaPizzaria()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/pizzaria/inserir/', async (req, resp) => {
    try {
        let produto = req.body
        let id = await bd.inserirPizzaria(produto)
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

endpoints.put('/pizzaria/alterar/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let produto = req.body
        let linhasAfetadas = await bd.alterarPizzaria(id, produto)
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

endpoints.delete('/pizzaria/delete/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.deletarPizzaria(id)
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