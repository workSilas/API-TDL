import con from "./connection.js";

export async function inserirVenda(venda) {
    let comando = `
    insert tb_vendas (id_usuario, id_produto, quantidade, total, data, endereco, enviado)
    values           (?, ?, ?, ?, ?, ?, false);
    `

    let resposta = await con.query(comando, [venda.idProduto, venda.idUsuario, venda.quantidade, venda.total, venda.data, venda.endereco])
    let info = resposta[0]
    return info.insertId
}

// Vendas

export async function consultaVenda() {
    let comando = `
    select  V.id_venda as id,
            U.nome as usuario_nome,
            P.nome as produto_nome,
            V.quantidade,
            V.data,
            V.endereco,
            V.enviado 
      from  tb_vendas V
      join  tb_usuarios U on V.id_usuario = U.id_usuario
      join  tb_produtos P on V.id_produto = P.id_produto
     where  V.enviado = true;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

// Vendas Total

export async function consultaVendaTotal() {
    let comando = `
        select  SUM(total) as Total
                from  tb_vendas
        where   enviado = true;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

// Vendas Sessão

export async function consultaVendaSessao(venda) {
    let comando = `
        select  V.id_venda as id,
                U.nome as usuario_nome,
                P.nome as produto_nome,
                V.quantidade,
                V.total,			-- Vai ser uma variável com a a multiplicação do valor pela quantidade
                V.data, 
                V.endereco,
                V.enviado 
          from  tb_vendas V
          join  tb_usuarios U on V.id_usuario = U.id_usuario
          join  tb_produtos P on V.id_produto = P.id_produto
         where  P.sessao  = ?
           and  V.enviado = true;
    `

    let resposta = await con.query(comando, [venda.sessao])
    let registro = resposta[0]
    return registro
}

// Vendas Sessão Total

export async function consultaVendaSessaoTotal(venda) {
    let comando = `
    select  SUM(V.total) as Total
      from  tb_vendas V
      join  tb_produtos P ON V.id_produto = P.id_produto 
     where 	V.enviado = true
       and 	P.sessao = ?;
    `

    let resposta = await con.query(comando, [venda.sessao])
    let registro = resposta[0]
    return registro
}

// Todas as Vendas 

export async function consultaTodasVendas() {
    let comando = `
    select  V.id_venda as id,
            U.nome as usuario_nome,
            P.nome as produto_nome,
            V.quantidade,
            V.data,
            V.endereco,
            V.enviado 
      from  tb_vendas V
      join  tb_usuarios U on V.id_usuario = U.id_usuario  
      join  tb_produtos P on V.id_produto = P.id_produto;  
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

// Finalizado

export async function finalizarVenda(id) {
    let comando = `
    update tb_vendas
       set enviado    = true
     where id_venda   = ?;
    `

    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}