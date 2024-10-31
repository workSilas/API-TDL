
import con from "./connection.js";

// Usuário

export async function validarUsuario(usuario) {
  let comando = `
    select  id_usuario as id,
            nome
      from  tb_usuarios
     where  nome          = ?
       and  senha         = ?;
    `

  let resposta = await con.query(comando, [usuario.nome, usuario.senha])
  let registro = resposta[0]
  return registro[0]
}
