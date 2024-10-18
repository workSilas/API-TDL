import * as bd from '../Repository/tb_usuariosRepository.js'

import { Router } from 'express'
const endpoints = Router()


endpoints.post('/tdl/usuarios/inserir/', async (req, resp) => {
    try {
        let usuario = req.body
        let id = await bd.inserirUsuario(usuario)
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

endpoints.get('/tdl/usuarios/consulta/', async (req, resp) => {
    try {
        let usuario = req.body
        let registros = await bd.validarUsuario(usuario)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/tdl/usuarios/consulta/:id', async (req, resp) => {
    try {

        let id = req.params.id
        let registros = await bd.consultaNomeUsuario(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;