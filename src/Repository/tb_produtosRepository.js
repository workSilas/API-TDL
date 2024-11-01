import con from "./connection.js";

export async function inserirProduto(produto) {
    let comando = `
    insert tb_produtos  (nome, valor, quantidade, descricao, sessao, imagem) 
    values              (?, ?, ?, ?, ?, ?);
    `

    let resposta = await con.query(comando, [produto.nome, produto.valor, produto.quantidade, produto.descricao, produto.sessao, produto.imagem])
    let info = resposta[0]
    return info.insertId
}

// Card Cat     

export async function consultaCardProduto(sessao) {
    let comando = `
    select  id_produto as id,
            nome,
            valor,
            quantidade,
            imagem
      from  tb_produtos
     where  sessao = ?;
    `

    let resposta = await con.query(comando, [sessao])
    let registro = resposta[0]
    const temp = []
    for (let item in registro) {
        registro[item].imagem = registro[item]?.imagem?.toString()
        temp.push(registro[item])
    }
    return temp
}

// Exibição

export async function exibicaoProduto(id) {
    let comando = `
    select  id_produto as id,
            nome,
            valor,
            quantidade,
            descricao,
            imagem
      from  tb_produtos
     where  id_produto = ?;
    `

    let resposta = await con.query(comando, [id])
    let registro = resposta[0][0]
    if (registro.imagem != null) {
        registro.imagem = registro.imagem.toString()
    }
    return [registro]
}



// Estoque

export async function estoqueProduto() {
    let comando = `
    select  id_produto as id,
            nome,
            quantidade  
     from   tb_produtos;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

// Sem Estoque

export async function semEstoque() {
    let comando = `
    select  id_produto as id,
            nome,
            quantidade
      from  tb_produtos
     where  quantidade = 0;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

// Alter Produto

export async function alterarProduto(id, produto) {
    let comando = `
    update 	tb_produtos
       set  nome 	    = ?,
            valor 	    = ?,
            quantidade  = ?,
            descricao   = ?,
            sessao      = ?,
            imagem      = ?
     where 	id_produto  = ?;
    `

    let resposta = await con.query(comando, [produto.nome, produto.valor, produto.quantidade, produto.descricao, produto.sessao, produto.imagem, id])
    let info = resposta[0]
    return info.affectedRows
}

// Alter Estoque

export async function alterarEstoque(id, produto) {
    let comando = `
    update tb_produtos
       set quantidade = ?
     where id_produto = ?;
    `

    let resposta = await con.query(comando, [produto.quantidade, id])
    let info = resposta[0]
    return info.affectedRows
}

// Delete Produto sem Estoque

export async function deletarSemEstoque() {
    let comando = `
    delete from tb_produtos
     where quantidade = 0;
    `
    let resposta = await con.query(comando)
    let info = resposta[0]
    return info.affectedRows
}

// Delete Produto 

export async function deletarProduto(id) {
    let comando = `
    delete from tb_produtos
     where id_produto = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}