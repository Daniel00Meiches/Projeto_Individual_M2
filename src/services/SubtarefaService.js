const SubtarefaModel = require('../models/SubtarefaModel');

async function criarSubtarefaService(data) {
  return await SubtarefaModel.criar(data);
}

async function listarSubtarefasService() {
  return await SubtarefaModel.listar();
}

async function editarSubtarefaService(id, data) {
  return await SubtarefaModel.atualizar(id, data);
}

async function excluirSubtarefaService(id) {
  return await SubtarefaModel.excluir(id);
}

module.exports = {
  criarSubtarefaService,
  listarSubtarefasService,
  editarSubtarefaService,
  excluirSubtarefaService,
};