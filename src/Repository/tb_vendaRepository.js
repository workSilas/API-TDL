import con from "./connection.js";

export async function consultaIdVenda(id) {
    let comando = `
    select  id,
            dt              data,
            produto_id,
            usuario_id
      from  tb_venda
      where id = ?;
    `

    let resposta = await con.query(comando, [id])
    let registro = resposta[0]
    return registro[0]
}

export async function consultaVenda() {
    let comando = `
    select  id,
            dt              data,
            produto_id,
            usuario_id
      from  tb_venda;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

export async function inserirVenda(venda) {
    let comando = `
    insert tb_venda 	(dt, produto_id, usuario_id) 
    values              (?, ?, ?);
    `

    let resposta = await con.query(comando, [venda.data, venda.produtoId, venda.usuarioId])
    let info = resposta[0]
    return info.insertId
}

export async function alterarVenda(id, venda) {
    let comando = `
    update 	tb_venda 
       set 	dt 	            = ?,
            produto_id 	    = ?,
            usuario_id 		= ?
     where 	id 		        = ?;
    `

    let resposta = await con.query(comando, [venda.data, venda.produtoId, venda.usuarioId, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function deletarVenda(id) {
    let comando = `
    delete 
      from  tb_venda	
     where  id = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}