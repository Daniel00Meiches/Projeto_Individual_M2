const db = require('../config/db');

const UserModel = {
  async criar({ username, email, senha_hash }) {
    const query = `
      INSERT INTO app_user (username, email, senha_hash)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [username, email, senha_hash];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM app_user');
    return result.rows;
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM app_user WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = UserModel;