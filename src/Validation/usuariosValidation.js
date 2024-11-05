export function validarUsuarios(usuarios) {
    if (!usuarios.nome)
        throw new Error('Informe o valor do Nome')

    if (!usuarios.email)
        throw new Error('Informe o valor do Email')

    if (!usuarios.senha)
        throw new Error('Informe o valor da senha')
}
