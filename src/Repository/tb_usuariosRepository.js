import con from "./connection.js";
import crypto from "crypto-js";


export async function inserirUsuario(usuario) {
  const comando = `
      insert into tb_usuarios (nome, senha) 
      values                  (?, ?)
  `;

  let hash = crypto.SHA256(usuario.senha).toString();
  let resposta = await con.query(comando, [usuario.nome, hash])
  let info = resposta[0];
  return info.insertId;
}

// Usuário

export async function validarUsuario(usuario) {
  let comando = `
    select  id_usuario as id,
            nome
      from  tb_usuarios
     where  nome          = ?
       and  senha         = ?;
    `

  let hash = crypto.SHA256(usuario.senha).toString();
  let resposta = await con.query(comando, [usuario.nome, hash])
  return resposta = resposta[0][0]
}
