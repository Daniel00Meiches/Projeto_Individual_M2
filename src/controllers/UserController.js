const userService = require('../services/UserService');

exports.criarUser = async (req, res) => {
  try {
    const user = await userService.criarUserService(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarUser = async (req, res) => {
  try {
    const users = await userService.listarUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUser = async (req, res) => {
  try {
    const user = await userService.editarUserService(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirUser = async (req, res) => {
  try {
    const user = await userService.excluirUserService(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};