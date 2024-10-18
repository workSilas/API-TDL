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



export async function alterarUsuario(id, usuario) {
    let comando = `
    update 	tb_usuarios
       set 	nm_usuario 	    = ?,
            nr_telefone 	= ?,
            ds_senha 		= ?
     where 	id 		        = ?;
    `

    let resposta = await con.query(comando, [usuario.nome, usuario.telefone, usuario.senha, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function deletarUsuario(id) {
    let comando = `
    delete 
      from  tb_usuarios
     where  id = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}