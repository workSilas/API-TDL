import bcrypt from 'bcrypt';

export async function criptografarSenha(senha) {
    const saltRounds = 10
    return await bcrypt.hash(senha, saltRounds);
}
  
export async function verificarSenha(senhaInserida, hashArmazenado) {
    return await bcrypt.compare(senhaInserida, hashArmazenado);
}
