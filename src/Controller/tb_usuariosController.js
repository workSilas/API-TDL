import * as bd from '../Repository/tb_usuariosRepository.js'
import { validarUsuarios } from '../Validation/usuariosValidation.js'

import { autenticar, gerarToken } from "../utils/jwt.js"
import { Router } from 'express'
const endpoints = Router()


endpoints.post('/tdl/usuarios/inserir/', async (req, resp) => {
    try {
        let usuario = req.body

        validarUsuarios(usuario)
        await bd.inserirUsuario(usuario)

        if (usuario === null) {
            resp.send({ erro: "Usuário ou senha incorreto(s)." })
        }
        else {
            let token = gerarToken(usuario)
            resp.send({
                "token": token
            })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Usuário

endpoints.get('/tdl/usuarios/consulta', autenticar, async (req, resp) => {
    try {
        let pessoa = req.user
        let usuario = await bd.validarUsuario(pessoa)

        if (usuario === null) {
            resp.send({ erro: "Usuário ou senha incorreto(s)." })
        }
        else {
            resp.send(usuario)
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Nome Usuário

endpoints.get('/tdl/usuarios/consulta/:id', autenticar, async (req, resp) => {
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
