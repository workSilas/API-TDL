import * as bd from '../Repository/tb_usuariosRepository.js'
import { validarLogin, validarUsuarios } from '../Validation/usuariosValidation.js'
import { verificarSenha } from '../utils/criptografia.js'
import { gerarTokenUser, gerarTokenAdm, autenticar, autorizarAdmin } from "../utils/jwt.js"

import { Router } from 'express'
const endpoints = Router()


// Usuário Comum
endpoints.post('/tdl/usuarios/entrar', async (req, resp) => {
    try {
        let pessoa = req.body
        validarLogin(pessoa)

        let senha = pessoa.senha
        let hash = await bd.buscarEmailUsuario(pessoa.email)
        let verificacao = await verificarSenha(senha, hash)

        pessoa = {
            "email": pessoa.email,
            "senha": hash
        }

        let usuario = await bd.validarUsuarioComum(pessoa)

        if (verificacao == true) {
            let token = gerarTokenUser(usuario)
            resp.send({
                "token": token,
            })
        }
        else {
            resp.status(400).send({
                erro: 'Senha incorreta'
            })
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


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


endpoints.delete('/tdl/usuarios/deletar', async (req, resp) => {
    try {
        let idUsuario = req.user.id
        let linhasAfetadas = await bd.deletarUsuario(idUsuario)
        
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


endpoints.put('/tdl/usuarios/alterar', async (req, resp) => {
    try {
        let id = req.user.id
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


endpoints.get('/tdl/usuarios/consultar', async (req, resp) => {
    try {
        let usuario = req.user

        if (usuario == null || usuario == undefined) {
            resp.status(404).send({
                erro: 'Nenhum usuário encontrado'
            })
        } else {
            resp.send(usuario)
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})


endpoints.get('/tdl/usuarios/autenticar', autenticar, async (req, resp) => {
    try {
        let user = req.user

        if (user.user_type !== 'user') {
            resp.status(404).send({
                erro: 'Usuário não encontrado'
            })
        } 
        else {
            resp.status(204).send()
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})


// Admin
endpoints.post('/tdl/adm/inserir', async (req, resp) => {
    try {
        let usuario = req.body
        validarUsuarios(usuario)
        let id = await bd.inserirAdm(usuario)
        
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


endpoints.post('/tdl/adm/entrar', async (req, resp) => {
    try {
        let pessoa = req.body
        validarLogin(pessoa)

        let senha = pessoa.senha
        let hash = await bd.buscarEmailUsuario(pessoa.email)
        let verificacao = await verificarSenha(senha, hash)

        pessoa = {
            "email": pessoa.email,
            "senha": hash
        }

        let usuario = await bd.validarUsuarioAdm(pessoa)

        if (verificacao == true) {
            let token = gerarTokenAdm(usuario)
            resp.send({
                "token": token,
            })
        }
        else {
            resp.status(400).send({
                erro: 'Senha incorreta'
            })
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.get('/tdl/adm/consulta', async (req, resp) => {
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


endpoints.get('/tdl/adm/autenticar', autenticar, autorizarAdmin, async (req, resp) => {
    try {
        let user = req.user.user_type

        if (user !== 'admin') {
            resp.status(404).send({
                erro: 'Usuário não encontrado'
            })
        } 
        else {
            resp.status(204).send()
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

export default endpoints;
