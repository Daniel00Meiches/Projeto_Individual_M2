const db = require('../config/db');

async function criarTarefaService(dados) {
  const { titulo, descricao, data_criada, data_de_entrega, concluido = false, id_usuario } = dados;

  const query = `
    INSERT INTO tarefa (titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
  const values = [titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarTarefasService() {
  const query = 'SELECT * FROM tarefa ORDER BY data_criada DESC';
  const result = await db.query(query);
  return result.rows;
}

async function editarTarefaService(id, dados) {
  const { titulo, descricao, data_de_entrega, concluido } = dados;

  const query = `
    UPDATE tarefa
    SET titulo = $1, descricao = $2, data_de_entrega = $3, concluido = $4
    WHERE id = $5
    RETURNING *`;
  const values = [titulo, descricao, data_de_entrega, concluido, id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function excluirTarefaService(id) {
  const query = 'DELETE FROM tarefa WHERE id = $1 RETURNING *';
  const result = await db.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarTarefaService,
  listarTarefasService,
  editarTarefaService,
  excluirTarefaService,
};