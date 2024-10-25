export function validarEncomendas(encomendas) {
    if (!encomendas.idUsuario)
        throw new Error('Informe o Id do Usuário')

    if (!encomendas.descricao)
        throw new Error('Informe a Descrição da Encomenda')

    if (!encomendas.imagem)
        throw new Error('Informe a Imagem da Encomenda')
}
