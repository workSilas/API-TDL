import * as bd from '../Repository/tb_produtosRepository.js'
import { validarProdutos } from '../Validation/produtosValidation.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.post('/tdl/produtos/inserir/', async (req, resp) => {
    try {
        let produto = req.body
        validarProdutos(produto)

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

// Card Cat     
endpoints.post('/tdl/produtos/consulta/:sessao', async (req, resp) => {
    try {
        let sessao = req.params.sessao
        let registros = await bd.consultaCardProduto(sessao)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Exibição
endpoints.post('/tdl/produtos/consultaId/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await bd.exibicaoProduto(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Estoque
endpoints.get('/tdl/produtos/estoque/', async (req, resp) => {
    try {
        let registros = await bd.estoqueProduto()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Sem Estoque
endpoints.get('/tdl/produtos/semEstoque/', async (req, resp) => {
    try {
        let produto = req.body
        let registros = await bd.semEstoque(produto)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Alter Produto
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

// Alter Estoque
endpoints.put('/tdl/produtos/alterarEstoque/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let produto = req.body
        let linhasAfetadas = await bd.alterarEstoque(id, produto)
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

// Delete Produto sem Estoque
endpoints.delete('/tdl/produtos/deleteEstoque/', async (req, resp) => {
    try {
        let linhasAfetadas = await bd.deletarSemEstoque()
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

// Delete Produto 
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
