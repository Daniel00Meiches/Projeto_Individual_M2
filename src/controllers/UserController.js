const pool = require('../config/db'); // Certifique-se de que o pool está importado corretamente

// Criar um novo user
exports.criarUser = async (req, res) => {
  const { username, email, senha_hash } = req.body;

  const query = `
    INSERT INTO app_user (username, email, senha_hash)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [username, email, senha_hash];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os users
exports.listarUser = async (req, res) => {
  const query = 'SELECT * FROM app_user';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um user
exports.editarUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, senha_hash } = req.body;

  const query = `
    UPDATE app_user
    SET username = $1, email = $2, senha_hash = $3
    WHERE id = $4 RETURNING *`;
  const values = [username, email, senha_hash, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um user
exports.excluirUser = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM app_user WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
