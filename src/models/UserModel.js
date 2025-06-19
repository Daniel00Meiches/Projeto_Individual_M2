const db = require('../config/db');
const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(55).required(),
  email: Joi.string().email().required(),
  senha_hash: Joi.string().min(1).max(30).required()
});

const UserModel = {
  async criar({ username, email, senha_hash }) {
    const { error } = userSchema.validate({ username, email, senha_hash });
    if (error) throw new Error(`Erro de validação (User): ${error.message}`);

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

module.exports = {
  ...UserModel,
  schema: userSchema
};