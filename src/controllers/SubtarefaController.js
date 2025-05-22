const Subtarefa = require('../models/SubtarefaModel');

exports.criarSubtarefa = async (req, res) => {
  try {
    const subtarefa = await Subtarefa.criar(req.body);
    res.status(201).json(subtarefa);
  } catch (err) {
    console.error('Erro ao criar subtarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.listarSubtarefas = async (req, res) => {
  try {
    const subtarefas = await Subtarefa.listar();
    res.status(200).json(subtarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarSubtarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const subtarefa = await Subtarefa.atualizar(id, req.body);
    if (!subtarefa) return res.status(404).json({ message: 'Subtarefa não encontrada' });
    res.status(200).json(subtarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirSubtarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const subtarefa = await Subtarefa.excluir(id);
    if (!subtarefa) return res.status(404).json({ message: 'Subtarefa não encontrada' });
    res.status(200).json({ message: 'Subtarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};