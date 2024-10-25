export function validarFavoritos(favoritos) {
    if (!favoritos.idProduto)
        throw new Error('Informe o Id do Produto')

    if (isNaN(favoritos.idProduto))
        throw new Error('Valor do Id do Produto inválido')

    if (!favoritos.idUsuario)
        throw new Error('Informe o Id do Usuário')

    if (isNaN(favoritos.idUsuario))
        throw new Error('Valor do Id do Usuário inválido')
}
