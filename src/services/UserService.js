const db = require('../config/db');

async function criarUserService({ username, email, senha_hash }) {
  const query = `
    INSERT INTO app_user (username, email, senha_hash)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [username, email, senha_hash];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarUsersService() {
  const result = await db.query('SELECT * FROM app_user');
  return result.rows;
}

async function editarUserService(id, { username, email, senha_hash }) {
  const query = `
    UPDATE app_user
    SET username = $1, email = $2, senha_hash = $3
    WHERE id = $4
    RETURNING *`;
  const values = [username, email, senha_hash, id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function excluirUserService(id) {
  const query = 'DELETE FROM app_user WHERE id = $1 RETURNING *';
  const result = await db.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarUserService,
  listarUsersService,
  editarUserService,
  excluirUserService,
};