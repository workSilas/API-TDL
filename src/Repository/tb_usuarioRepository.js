import con from "./connection.js";

export async function consultaIdUsuario(id) {
    let comando = `
    select  id,
            nm_usuario      nome,
            nr_telefone     telefone,
            ds_senha        senha
      from  tb_usuario
      where id = ?;
    `

    let resposta = await con.query(comando, [id])
    let registro = resposta[0]
    return registro[0]
}

export async function consultaUsuario() {
    let comando = `
    select  id,
            nm_usuario      nome,
            nr_telefone     telefone,
            ds_senha        senha
      from  tb_usuario;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

export async function inserirUsuario(usuario) {
    let comando = `
    insert tb_usuario 	(nm_usuario, nr_telefone, ds_senha) 
    values              (?, ?, ?);
    `

    let resposta = await con.query(comando, [usuario.nome, usuario.telefone, usuario.senha])
    let info = resposta[0]
    return info.insertId
}

export async function alterarUsuario(id, usuario) {
    let comando = `
    update 	tb_usuario 
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
      from  tb_usuario	
     where  id = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}