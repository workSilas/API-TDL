import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import criarRotas from './router.js'

const servidor = express()

servidor.use(express.json({ limit: '10mb' }))
servidor.use(cors())

criarRotas(servidor)
servidor.listen(process.env.PORTA, () => console.log(`API subiu na porta ${process.env.PORTA}`))
