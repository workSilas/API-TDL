import * as bd from '../Repository/tb_favoritosRepository.js'
import { validarFavoritos } from '../Validation/favoritosValidation.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.post('/tdl/favoritos/inserir/', async (req, resp) => {
    try {
        let favorito = req.body
        validarFavoritos(favorito)
        favorito.idUsuario = req.user.id

        let id = await bd.inserirFavorito(favorito)
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

// Card Fav
endpoints.get('/tdl/favoritos/consulta/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let idUsuario = req.user.id
        let registros = await bd.consultaCardFavorito(id, idUsuario)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// Delete Fav
endpoints.delete('/tdl/favoritos/delete/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.deletarFavorito(id)
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

// Delete Fav Produto
endpoints.delete('/tdl/favoritos/deleteProduto/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let linhasAfetadas = await bd.deletarFavoritoProduto(id)
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
