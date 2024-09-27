import produtos from "./Controller/produtoController.js"


export default function criarRotas(servidor) {
    servidor.use(produtos)
}