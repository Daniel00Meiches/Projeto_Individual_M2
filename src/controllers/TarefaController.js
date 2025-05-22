const db = require('../config/db');

exports.criarTarefa = async (req, res) => {
  const { titulo, descricao, data_criada, data_de_entrega, concluido = false, id_usuario } = req.body;

  const query = `
    INSERT INTO tarefa (titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario];

  try {
    const result = await db.query(query, values);
    const tarefa = result.rows[0];
    console.log('Tarefa criada:', tarefa);
    res.status(201).json(tarefa);
  } catch (err) {
    console.error('Erro no criarTarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = 'SELECT * FROM tarefa ORDER BY data_criada DESC';

  try {
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data_de_entrega, concluido } = req.body;

  const query = `
    UPDATE tarefa
    SET titulo = $1, descricao = $2, data_de_entrega = $3, concluido = $4
    WHERE id = $5
    RETURNING *`;
  const values = [titulo, descricao, data_de_entrega, concluido, id];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tarefa WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};