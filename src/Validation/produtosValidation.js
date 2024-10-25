export function validarProdutos(produtos) {
    if (!produtos.nome)
        throw new Error('Informe o nome do Produto')

    if (!produtos.valor)
        throw new Error('Informe o valor do Produto')

    if (!produtos.quantidade)
        throw new Error('Informe a quantidade do Produto')

    if (!produtos.descricao)
        throw new Error('Informe a descricao do Produto')

    if (!produtos.sessao)
        throw new Error('Informe a sessão do Produto')

    if (!produtos.imagem)
        throw new Error('Informe a imagem do Produto')
}