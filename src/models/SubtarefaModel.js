const db = require('../config/db');
const Joi = require('joi');

const subtarefaSchema = Joi.object({
  title: Joi.string().max(256).required(),
  descricao: Joi.string().allow(null, ''),
  ordem: Joi.number().integer().required(),
  concluido: Joi.boolean().default(false),
  id_tarefa: Joi.number().integer().required()
});

const subtarefaUpdateSchema = Joi.object({
  title: Joi.string().max(256).required(),
  descricao: Joi.string().allow(null, ''),
  concluido: Joi.boolean().required()
});

const SubtarefaModel = {
  async criar(data) {
    const { error } = subtarefaSchema.validate(data);
    if (error) throw new Error(`Erro de validação (Subtarefa): ${error.message}`);

    const { title, descricao, ordem, concluido, id_tarefa } = data;

    const query = `
      INSERT INTO subtarefa (title, descricao, ordem, concluido, id_tarefa)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [title, descricao, ordem, concluido, id_tarefa];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM subtarefa ORDER BY ordem ASC');
    return result.rows;
  },

  async atualizar(id, data) {
    const { error } = subtarefaUpdateSchema.validate(data);
    if (error) throw new Error(`Erro de validação (Subtarefa Update): ${error.message}`);

    const { title, descricao, concluido } = data;

    const query = `
      UPDATE subtarefa
      SET title = $1, descricao = $2, concluido = $3
      WHERE id = $4
      RETURNING *`;
    const values = [title, descricao, concluido, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM subtarefa WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  async excluirPorTarefaId(id_tarefa) {
    await db.query('DELETE FROM subtarefa WHERE id_tarefa = $1', [id_tarefa]);
  }
};

module.exports = SubtarefaModel;