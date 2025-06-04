const tarefaService = require('../services/TarefaService');

exports.criarTarefa = async (req, res) => {
  try {
    const tarefa = await tarefaService.criarTarefaService(req.body);
    res.status(201).json(tarefa);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await tarefaService.listarTarefasService();
    res.status(200).json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefaAtualizada = await tarefaService.editarTarefaService(id, req.body);
    if (!tarefaAtualizada) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(tarefaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefaExcluida = await tarefaService.excluirTarefaService(id);
    if (!tarefaExcluida) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};