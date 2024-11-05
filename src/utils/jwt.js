import jwt from 'jsonwebtoken';
const KEY = '===!!TrioDosLacos==';

export function gerarToken(user) {
  const info = {
    id: user.id,
    user_type: user.user_type, // "admin" ou "user"
    name: user.nome,
    email: user.email
  };
  return jwt.sign(info, KEY);
}


export function autenticar(req, resp, next) {
  return autenticacao(req, resp, next);
}


export function autenticacao(req, resp, next) {
  try {
    let token = req.headers['x-access-token'];

    if (!token) token = req.query['x-access-token'];
    if (!token) return resp.status(403).json({ erro: 'Token não fornecido' });

    const decoded = jwt.verify(token, KEY);
    req.user = decoded;

    next();
  } catch (e) {
    resp.status(401).json({ erro: 'Falha na autenticação' });
  }
}


export function autorizarAdmin(req, resp, next) {
  if (req.user.user_type !== 'admin') {
    return resp.status(403).json({ erro: 'Acesso negado' });
  }
  next();
}
