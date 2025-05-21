const pool = require('../config/db.js');

// Criar uma nova subtarefa
exports.criarSubtarefa = async (req, res) => {
  const { title, descricao, ordem, concluido = false, id_tarefa } = req.body;

  const query = `
    INSERT INTO subtarefa (title, descricao, ordem, concluido, id_tarefa)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [title, descricao, ordem, concluido, id_tarefa];

  try {
    const result = await pool.query(query, values);
    const subtarefa = result.rows[0];
    res.status(201).json(subtarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as subtarefas
exports.listarSubtarefas = async (req, res) => {
  const query = 'SELECT * FROM subtarefa ORDER BY ordem ASC';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma subtarefa
exports.editarSubtarefa = async (req, res) => {
  const { id } = req.params;
  const { title, descricao, ordem, concluido } = req.body;

  const query = `
    UPDATE subtarefa
    SET title = $1, descricao = $2, ordem = $3, concluido = $4
    WHERE id = $5
    RETURNING *`;
  const values = [title, descricao, ordem, concluido, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Subtarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma subtarefa
exports.excluirSubtarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM subtarefa WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Subtarefa não encontrada' });
    }
    res.status(200).json({ message: 'Subtarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
