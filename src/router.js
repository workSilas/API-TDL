import usuarios from "./Controller/tb_usuarioController.js"


export default function criarRotas(servidor) {
    servidor.use(usuarios)
}