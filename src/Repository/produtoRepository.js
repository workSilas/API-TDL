import con from "./connection.js";

export async function consultaIdPizzaria(id) {
    let comando = `
    select  id_produto as id,
            nome,
            valor,
            descricao,
            quantidade		
      from  produto
      where id_produto = ?;
    `

    let resposta = await con.query(comando, [id])
    let registro = resposta[0]
    return registro[0]
}

export async function consultaPizzaria() {
    let comando = `
    select  id_produto as id,
            nome,
            valor,
            descricao,
            quantidade		
      from  produto;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

export async function inserirPizzaria(produto) {
    let comando = `
    insert produto 	(nome, valor, descricao, quantidade) 
    values          (?, ?, ?, ?);
    `

    let resposta = await con.query(comando, [produto.nome, produto.valor, produto.descricao, produto.quantidade])
    let info = resposta[0]
    return info.insertId
}

export async function alterarPizzaria(id, produto) {
    let comando = `
    update 	produto 
       set 	nome 			= ?,
            valor 			= ?,
            descricao 		= ?,
            quantidade 	    = ?
     where 	id_produto 		= ?;
    `

    let resposta = await con.query(comando, [produto.nome, produto.valor, produto.descricao, produto.quantidade, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function deletarPizzaria(id) {
    let comando = `
    delete 
      from  produto	
     where  id_produto = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}