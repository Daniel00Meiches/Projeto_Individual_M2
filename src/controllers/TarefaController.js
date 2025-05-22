const Tarefa = require('../models/TarefaModel');

exports.criarTarefa = async (req, res) => {
  try {
    const novaTarefa = await Tarefa.criar(req.body);
    res.status(201).json(novaTarefa);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.listar();
    res.status(200).json(tarefas);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.editarTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefaAtualizada = await Tarefa.atualizar(id, req.body);
    if (!tarefaAtualizada) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(tarefaAtualizada);
  } catch (err) {
    console.error('Erro ao editar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefaExcluida = await Tarefa.excluir(id);
    if (!tarefaExcluida) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};