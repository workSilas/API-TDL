import * as bd from '../Repository/tb_encomendasRepository.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/tdl/produtos/consulta/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await bd.consultaIdProduto(id)
        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default endpoints;