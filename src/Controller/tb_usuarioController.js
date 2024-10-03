import * as bd from '../Repository/tb_usuarioRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/tdl/usuarios/consulta/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await bd.consultaIdUsuario(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/tdl/usuarios/consulta/', async (req, resp) => {
    try {
        let registros = await bd.consultaUsuario()
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/tdl/usuario/inserir/', async (req, resp) => {
    try {
        let produto = req.body
        let id = await bd.inserirUsuario(produto)
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

endpoints.put('/tdl/usuario/alterar/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let produto = req.body
        let linhasAfetadas = await bd.alterarUsuario(id, produto)
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

endpoints.delete('/tdl/usuario/delete/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.deletarUsuario(id)
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