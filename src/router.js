import usuarios from "./Controller/tb_usuarioController.js"
import produtos from "./Controller/tb_produtoController.js"


export default function criarRotas(servidor) {
    servidor.use(usuarios)
    servidor.use(produtos)
}