import con from "./connection.js";

export async function inserirUsuario(usuario) {
    let comando = `
    insert tb_usuarios 	(nome, senha) 
    values              (?, ?);
    `

    let resposta = await con.query(comando, [usuario.nome, usuario.senha])
    let info = resposta[0]
    return info.insertId
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

    let resposta = await con.query(comando, [usuario.nome, usuario.senha])
    let registro = resposta[0]
    return registro[0]
}

// Nome Usuário

export async function consultaNomeUsuario(id) {
    let comando = `
    select  nome
      from  tb_usuarios
     where  id_usuario  = ?;
    `

    let resposta = await con.query(comando, [id])
    let registro = resposta[0]
    return registro
}