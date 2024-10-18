import con from "./connection.js";

export async function consultaIdProduto(id) {
    let comando = `
    select  id,
            nm_produto      nome,
            ds_descricao    descricao,
            ds_imagem       imagem,
            ds_sessao       sessao,
            nr_estoque      estoque,
            ds_cor          cor,
            tp_tipo         tipo
      from  tb_produto
      where id = ?;
    `

    let resposta = await con.query(comando, [id])
    let registro = resposta[0]
    return registro[0]
}

export async function consultaProduto() {
    let comando = `
    select  id,
            nm_produto      nome,
            ds_descricao    descricao,
            ds_imagem       imagem,
            ds_sessao       sessao,
            nr_estoque      estoque,
            ds_cor          cor,
            tp_tipo         tipo
      from  tb_produto;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

export async function inserirProduto(produto) {
    let comando = `
    insert tb_produto 	(nm_produto, ds_descricao, ds_imagem, ds_sessao, nr_estoque, ds_cor, tp_tipo) 
    values              (?, ?, ?, ?, ?, ?, ?);
    `

    let resposta = await con.query(comando, [produto.nome, produto.descricao, produto.imagem, produto.sessao, produto.estoque, produto.cor, produto.tipo])
    let info = resposta[0]
    return info.insertId
}

export async function alterarProduto(id, produto) {
    let comando = `
    update 	tb_produto 
       set 	nm_produto 	    = ?,
            ds_descricao 	= ?,
            ds_imagem 		= ?,
            ds_sessao       = ?,
            nr_estoque      = ?,
            ds_cor          = ?,
            tp_tipo         = ?
     where 	id 		        = ?;
    `

    let resposta = await con.query(comando, [produto.nome, produto.descricao, produto.imagem, produto.sessao, produto.estoque, produto.cor, produto.tipo, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function deletarProduto(id) {
    let comando = `
    delete 
      from  tb_produto	
     where  id = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}