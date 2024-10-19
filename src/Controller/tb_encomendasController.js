import * as bd from '../Repository/tb_encomendasRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.post('/tdl/encomendas/inserir/', async (req, resp) => {
    try {
        let encomenda = req.body
        let id = await bd.inserirEncomenda(encomenda)
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

endpoints.get('/tdl/encomendas/consulta/', async (req, resp) => {
    try {
        let encomenda = req.body
        let registros = await bd.consultaEncomenda(encomenda)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;