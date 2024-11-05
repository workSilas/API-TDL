import * as bd from '../Repository/tb_usuariosRepository.js'
import { validarUsuarios } from '../Validation/usuariosValidation.js'
import { gerarToken } from "../utils/jwt.js"
import { autenticar } from '../utils/jwt.js'
import { autorizarAdmin } from '../utils/jwt.js'

import { Router } from 'express'
const endpoints = Router()


//Verificar se o Usuário é um Administrador ou não e Gerar Token para Ele
endpoints.post('/tdl/usuarios/entrar', async (req, resp) => {
    try {
        let pessoa = req.body
        let usuarioAdm = await bd.validarUsuarioAdm(pessoa)
        let usuarioNormal = await bd.validarUsuarioComum(pessoa)

        if (usuarioAdm == null) {
            let token = gerarToken(usuarioNormal)
            resp.send({
                "nome": usuarioNormal.nome,
                "token": token
            })
        } 
        else if (usuarioNormal == null) {
            let token = gerarToken(usuarioAdm)
            resp.send({
                "nome": usuarioAdm.nome,
                "token": token
            })
        }
        else {
            resp.status(404).send({
                erro: 'Usuário ou senha incorreto(s)'
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})


// Usuário Comum
endpoints.post('/tdl/usuarios/inserir', async (req, resp) => {
    try {
        let usuario = req.body
        validarUsuarios(usuario)
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


endpoints.delete('/tdl/usuarios/deletar', autenticar, async (req, resp) => {
    try {
        let senha = req.query.senha
        let linhasAfetadas = await bd.deletarUsuario(senha)

        if (linhasAfetadas > 0) {
            resp.status(204).send()
        }
        else {
            resp.status(404).send({
                erro: "Nenhum registro encontrado"
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})


endpoints.put('/tdl/usuarios/alterar', autenticar, async (req, resp) => {
    try {
        let id = req.query.id
        let usuario = req.body
        validarUsuarios(usuario)

        let linhasAfetadas = await bd.alterarUsuario(id, usuario)

        if (linhasAfetadas > 0) {
            resp.status(204).send()
        } 
        else {
            resp.status(404).send({
                erro: "Nenhum registro encontrado"
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})


// Admin
endpoints.get('/tdl/usuarioAdm/consulta', autenticar, autorizarAdmin, async (req, resp) => {
    try {
        let registros = await bd.consultarTodosOsUsuariosComuns()
        resp.send(registros)
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

export default endpoints;
