import usuarios from "./Controller/tb_usuariosController.js"
import produtos from "./Controller/tb_produtosController.js"
import vendas from "./Controller/tb_vendasController.js"
import favoritos from "./Controller/tb_favoritosController.js"
import encomendas from "./Controller/tb_encomendasController.js"

export default function criarRotas(servidor) {
    servidor.use(usuarios)
    servidor.use(produtos)
    servidor.use(vendas)
    servidor.use(favoritos)
    servidor.use(encomendas)
}