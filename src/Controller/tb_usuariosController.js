import * as bd from '../Repository/tb_usuariosRepository.js'
import { validarUsuarios } from '../Validation/usuariosValidation.js'
import { gerarToken } from "../utils/jwt.js"

import { Router } from 'express'
const endpoints = Router()


endpoints.post('/tdl/usuarios/inserir', async (req, resp) => {
    try {
        let pessoa = req.body;

        let id = await bd.inserirUsuario(pessoa);

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


endpoints.post('/tdl/usuarios/entrar', async (req, resp) => {
    try {
        let pessoa = req.body
        validarUsuarios(pessoa)
        let usuario = await bd.validarUsuario(pessoa)

        if (usuario === null) {
            resp.send({ erro: "Usuário ou senha incorreto(s)." })
        }
        else {
            let token = gerarToken(usuario)
            resp.send({
                "nome": pessoa.nome,
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

export default endpoints;