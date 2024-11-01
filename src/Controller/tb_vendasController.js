import * as bd from '../Repository/tb_vendasRepository.js'
import * as bdProduto from '../Repository/tb_produtosRepository.js'

import { Router } from 'express'
import { validarVendas } from '../Validation/vendasValidation.js'
const endpoints = Router()

endpoints.post('/tdl/vendas/inserir/', async (req, resp) => {
    try {
        let venda = req.body
        console.log(venda);
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

endpoints.post('/tdl/vendas/consultaSessao/:sessao', async (req, resp) => {
    try {
        let sessao = req.params.sessao
        let registros = await bd.consultaVendaSessao(sessao)
        resp.send(registros)

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Vendas Sessão Total

endpoints.post('/tdl/vendas/consultaSessaoTotal/:sessao', async (req, resp) => {
    try {
        let sessao = req.params.sessao
        let registros = await bd.consultaVendaSessaoTotal(sessao)
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

        let venda = await bd.consultaVendaPorId(id);
        await bdProduto.alterarEstoque(venda.id_produto, venda.quantidade);


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