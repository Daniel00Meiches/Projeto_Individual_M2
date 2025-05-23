const subtarefaService = require('../services/SubtarefaService');

exports.criarSubtarefa = async (req, res) => {
  try {
    const subtarefa = await subtarefaService.criarSubtarefaService(req.body);
    res.status(201).json(subtarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarSubtarefas = async (req, res) => {
  try {
    const subtarefas = await subtarefaService.listarSubtarefasService();
    res.status(200).json(subtarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarSubtarefa = async (req, res) => {
  try {
    const subtarefa = await subtarefaService.editarSubtarefaService(req.params.id, req.body);
    if (!subtarefa) return res.status(404).json({ message: 'Subtarefa não encontrada' });
    res.status(200).json(subtarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirSubtarefa = async (req, res) => {
  try {
    const subtarefa = await subtarefaService.excluirSubtarefaService(req.params.id);
    if (!subtarefa) return res.status(404).json({ message: 'Subtarefa não encontrada' });
    res.status(200).json({ message: 'Subtarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};