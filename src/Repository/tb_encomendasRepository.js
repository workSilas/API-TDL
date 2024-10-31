import con from "./connection.js";

export async function inserirEncomenda(encomendas) {
    let comando = `
    insert tb_encomendas  (descricao, imagem) 
    values              (?, ?);
    `

    let resposta = await con.query(comando, [encomendas.idUsuario, encomendas.descricao, encomendas.imagem])
    let info = resposta[0]
    return info.insertId
}

export async function consultaEncomenda() {
    let comando = `
    select   E.id_encomenda as id,
             E.descricao         
      from   tb_encomendas E
    order by E.id_encomenda desc;
    `

    let resposta = await con.query(comando)
    let registro = resposta[0]
    return registro
}