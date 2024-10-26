import * as bd from '../Repository/tb_usuariosRepository.js'
import { validarUsuarios } from '../Validation/usuariosValidation.js'
import { gerarToken } from "../utils/jwt.js"

import { Router } from 'express'
const endpoints = Router()


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
