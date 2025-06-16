const db = require('../config/db');
const Joi = require('joi');

const tarefaSchema = Joi.object({
  titulo: Joi.string().max(256).required(),
  descricao: Joi.string().allow(null, ''),
  data_criada: Joi.date().required(),
  data_de_entrega: Joi.date().allow(null),
  concluido: Joi.boolean().default(false),
  id_usuario: Joi.number().integer().required()
});

const tarefaUpdateSchema = Joi.object({
  titulo: Joi.string().max(256).required(),
  descricao: Joi.string().allow(null, ''),
  data_de_entrega: Joi.date().allow(null),
  concluido: Joi.boolean().required()
});

const TarefaModel = {
  async criar(data) {
    const { error } = tarefaSchema.validate(data);
    if (error) throw new Error(`Erro de validação (Tarefa): ${error.message}`);

    const { titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario } = data;

    const query = `
      INSERT INTO tarefa (titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const query = 'SELECT * FROM tarefa ORDER BY data_criada DESC';
    const result = await db.query(query);
    return result.rows;
  },

  async atualizar(id, data) {
    const { error } = tarefaUpdateSchema.validate(data);
    if (error) throw new Error(`Erro de validação (Tarefa Update): ${error.message}`);

    const { titulo, descricao, data_de_entrega, concluido } = data;

    const query = `
      UPDATE tarefa
      SET titulo = $1, descricao = $2, data_de_entrega = $3, concluido = $4
      WHERE id = $5
      RETURNING *`;
    const values = [titulo, descricao, data_de_entrega, concluido, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM tarefa WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  async buscarPorUsuarioId(id_usuario) {
    const result = await db.query('SELECT * FROM tarefa WHERE id_usuario = $1', [id_usuario]);
    return result.rows;
  },

  async excluirPorUsuarioId(id_usuario) {
    await db.query('DELETE FROM tarefa WHERE id_usuario = $1', [id_usuario]);
  }
};

module.exports = TarefaModel;