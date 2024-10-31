export function validarUsuarios(usuarios) {
    if (!usuarios.nome)
        throw new Error('Nome incorreto. Informe um valor válido')

    if (!usuarios.senha)
        throw new Error('Senha incorreta. Informe um valor válido')
}
