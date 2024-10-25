export function validarVendas(vendas) {
    if (!vendas.idProduto)
        throw new Error('Informe o valor do Id do Produto')

    if (isNaN(vendas.idProduto))
        throw new Error('Valor do idProduto incorreto')

    if (!vendas.idUsuario)
        throw new Error('Informe o valor do Id do Usuário')

    if (isNaN(vendas.idUsuario))
        throw new Error('Valor do idProduto incorreto')
}
