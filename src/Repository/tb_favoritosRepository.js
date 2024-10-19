import con from "./connection.js";

export async function inserirFavorito(favorito) {
    let comando = `
    insert tb_favoritos  (id_produto, id_usuario) 
    values              (?, ?);
    `

    let resposta = await con.query(comando, [favorito.idProduto, favorito.idUsuario])
    let info = resposta[0]
    return info.insertId
}

// Card Fav

export async function consultaCardFavorito() {
    let comando = `
    select  P.id_produto as id,
            P.nome,
            P.valor,
            P.quantidade
      from  tb_favoritos F
      join  tb_produtos  P on F.id_produto = P.id_produto
      join  tb_usuarios  U on F.id_usuario = U.id_usuario;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}

// Delete Fav

export async function deletarFavorito(id) {
    let comando = `
    delete from tb_favoritos
          where id_favorito = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}

// Delete Fav Produto

export async function deletarFavoritoProduto(id) {
    let comando = `
    delete from tb_favoritos
          where id_produto = ?;
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}