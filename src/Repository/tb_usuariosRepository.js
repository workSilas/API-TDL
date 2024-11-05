import con from "./connection.js";

// Validar Usuário
export async function validarUsuarioAdm(usuario) {
  let comando = `
      SELECT id,
             nome, 
             email,
             user_type
        FROM tb_usuarios
       WHERE nome = ?
         AND senha = ?
         AND user_type = 'admin'
  `

  let resposta = await con.query(comando, [usuario.nome, usuario.senha])
  let registro = resposta[0]
  return registro[0];
}


export async function validarUsuarioComum(usuario) {
  let comando = `
      SELECT id,
             nome, 
             email,
             user_type
        FROM tb_usuarios
       WHERE nome = ?
         AND senha = ?
         AND user_type = 'user'
  `

  let resposta = await con.query(comando, [usuario.nome, usuario.senha])
  let registro = resposta[0]
  return registro[0];
}


// Usuário
export async function inserirUsuario(usuario) {
  let comando = `
      INSERT INTO tb_usuarios (nome, email, senha)
      VALUES (?, ?, ?)
  `

  let resposta = await con.query(comando, [usuario.nome, usuario.email, usuario.senha])
  let registro = resposta[0]
  return registro.insertId;
}


export async function deletarUsuario(id) {
  let comando = `
      DELETE FROM tb_usuarios
            WHERE senha = ?
              AND user_type = 'user'
  `

  let resposta = await con.query(comando, [id])
  let registro = resposta[0]
  return registro.affectedRows;
}


export async function alterarUsuario(id, usuario) {
  let comando = `
      UPDATE tb_usuarios
         SET nome = ?,
             email = ?,
             senha = ?
       WHERE id = ?
         AND user_type = 'user'
  `
  let registro = await con.query(comando, [usuario.nome, usuario.email, usuario.senha, id])
  let resposta = registro[0]
  return resposta.affectedRows;
}


// Admin
export async function consultarTodosOsUsuariosComuns() {
  let comando = `
      SELECT id,
             nome,
             email,
             senha
        FROM tb_usuarios
       WHERE user_type = 'user'
  `    

  let registros = await con.query(comando)
  return registros[0];
}
