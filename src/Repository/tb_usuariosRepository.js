import con from "./connection.js";
import { criptografarSenha } from "../utils/criptografia.js";

// Usuários
export async function validarUsuarioComum(usuario) {
  let comando = `
      select id_usuario as id,
             nome, 
             email,
             user_type
        from tb_usuarios
       where email = ?
         and senha = ?
         and user_type = 'user'
  `

  let resposta = await con.query(comando, [usuario.email, usuario.senha])
  return resposta[0]
}


export async function inserirUsuario(usuario) {
  let comando = `
      insert into tb_usuarios (nome, email, senha)
      values (?, ?, ?)
  `

  let senhaCriptografada = await criptografarSenha(usuario.senha)
  let resposta = await con.query(comando, [usuario.nome, usuario.email, senhaCriptografada])
  return resposta[0].insertId;
}


export async function buscarEmailUsuario(email) {
  let comando = `
      select senha
        from tb_usuarios
       where email = ?
  `

  let registro = await con.query(comando, [email])
  return registro[0][0].senha;
}


export async function deletarUsuario(id) {
  let comando = `
      delete from tb_usuarios
            where id_usuario = ?
              and user_type = 'user';
  `

  let resposta = await con.query(comando, [id])
  let linhasAfetadas = resposta[0]
  return linhasAfetadas.affectedRows;
}


export async function alterarUsuario(id, usuario) {
  let comando = `
      update tb_usuarios
         set nome = ?,
             email = ?,
             senha = ?
       where id_usuario = ?
         and user_type = 'user'
  `
  let registro = await con.query(comando, [usuario.nome, usuario.email, usuario.senha, id])
  return registro[0].affectedRows;
}


// Admin
export async function validarUsuarioAdm(usuario) {
  let comando = `
      select id_usuario as id,
             nome, 
             email,
             user_type
        from tb_usuarios
       where email = ?
         and senha = ?
         and user_type = 'admin'
  `

  let resposta = await con.query(comando, [usuario.email, usuario.senha])
  let registro = resposta[0]
  return registro[0];
}


export async function consultarTodosOsUsuariosComuns() {
  let comando = `
      select id_usuario,
             nome,
             email,
             senha
        from tb_usuarios
       where user_type = 'user'
  `    

  let registros = await con.query(comando)
  return registros[0];
}
