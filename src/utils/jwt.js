import jwt from 'jsonwebtoken';
const KEY = '===!!TrioDosLacos==';

export function gerarTokenUser(usuario) {
  const info = {
    id: usuario[0].id,
    nome: usuario[0].nome, 
    email: usuario[0].email,
    user_type: usuario[0].user_type
  }

  let token = jwt.sign(info, KEY)   
  return token
}


export function gerarTokenAdm(usuario) {
  const info = {
    id: usuario.id,
    nome: usuario.nome, 
    email: usuario.email,
    user_type: usuario.user_type
  }

  let token = jwt.sign(info, KEY)   
  return token
}


export function autenticar(req, resp, next) {
  return autenticacao(req, resp, next);
}


export function autenticacao(req, resp, next) {
  try {
    let token = req.headers['x-access-token']

    if (!token) token = req.query['x-access-token']
    if (!token) return resp.status(403).json({ erro: 'Token não fornecido' })

    const decoded = jwt.verify(token, KEY)
    req.user = decoded

    next()
  } catch (e) {
    resp.status(401).json({ erro: 'Falha na autenticação' })
  }
}


export function autorizarAdmin(req, resp, next) {
  if (req.user.user_type !== 'admin') {
    return resp.status(403).json({ erro: 'Acesso negado' })
  }
  next()
}
