import * as bd from '../Repository/tb_vendasRepository.js'

import { Router } from 'express'
import { validarVendas } from '../Validation/vendasValidation.js'
const endpoints = Router()

endpoints.post('/tdl/vendas/inserir/', async (req, resp) => {
    try {
        let venda = req.body
        validarVendas(venda)
        
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

// Vendas

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

// Vendas Total

endpoints.get('/tdl/vendas/consultaTotal/', async (req, resp) => {
    try {
        let registros = await bd.consultaVendaTotal()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Vendas Sessão

endpoints.get('/tdl/vendas/consultaSessao/', async (req, resp) => {
    try {
        let venda = req.body
        let registros = await bd.consultaVendaSessao(venda)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Vendas Sessão Total

endpoints.get('/tdl/vendas/consultaSessaoTotal/', async (req, resp) => {
    try {
        let venda = req.body
        let registros = await bd.consultaVendaSessaoTotal(venda)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Todas as Vendas 

endpoints.get('/tdl/vendas/consultaTodas/', async (req, resp) => {
    try {
        let registros = await bd.consultaTodasVendas()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Finalizado

endpoints.put('/tdl/vendas/alterar/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.finalizarVenda(id)
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