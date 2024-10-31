export function validarEncomendas(encomendas) {
    if (!encomendas.descricao)
        throw new Error('Informe a Descrição da Encomenda')
}
