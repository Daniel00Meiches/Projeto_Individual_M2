const User = require('../models/UserModel');

exports.criarUser = async (req, res) => {
  try {
    const user = await User.criar(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.listarUser = async (req, res) => {
  try {
    const users = await User.listar();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.atualizar(id, req.body);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.excluir(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};