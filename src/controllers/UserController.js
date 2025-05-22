const db = require('../config/db');

exports.criarUser = async (req, res) => {
  const { username, email, senha_hash } = req.body;

  const query = `
    INSERT INTO app_user (username, email, senha_hash)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [username, email, senha_hash];

  try {
    const result = await db.query(query, values);
    const user = result.rows[0];
    console.log('Usuário criado:', user);
    res.status(201).json(user);
  } catch (err) {
    console.error('Erro no criarUser:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.listarUser = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM app_user');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro no listarUser:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.editarUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, senha_hash } = req.body;

  const query = `
    UPDATE app_user
    SET username = $1, email = $2, senha_hash = $3
    WHERE id = $4 RETURNING *`;
  const values = [username, email, senha_hash, id];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro no editarUser:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.excluirUser = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM app_user WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Erro no excluirUser:', err);
    res.status(500).json({ error: err.message });
  }
};
