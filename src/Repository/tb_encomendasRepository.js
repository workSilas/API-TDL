import con from "./connection.js";

export async function inserirEncomenda(encomendas) {
    let comando = `
    insert tb_encomendas  (descricao, imagem) 
    values              (?, ?);
    `

    let resposta = await con.query(comando, [encomendas.descricao, encomendas.imagem])
    let info = resposta[0]
    return info.insertId
}

export async function consultaEncomenda() {
    let comando = `
    select   E.id_encomenda as id,
             U.nome,
             E.descricao         
      from   tb_encomendas E
      join   tb_usuarios  U
        on   E.id_usuario = U.id_usuario
    order by E.id_encomenda desc;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}