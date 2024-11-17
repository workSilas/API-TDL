export function validarUsuarios(usuarios) {
    if (!usuarios.nome)
        throw new Error('Informe seu nome')

    if (!usuarios.email)
        throw new Error('Informe seu email')

    if (!usuarios.senha)
        throw new Error('Informe sua senha')
}

export function validarLogin(comum) {
    if (!comum.email) 
        throw new Error('Informe o email')

    if (!comum.senha)
        throw new Error('Informe a senha')
}
