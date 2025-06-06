const TarefaModel = require('../models/TarefaModel');

async function criarTarefaService(data) {
  return await TarefaModel.criar(data);
}

async function listarTarefasService() {
  return await TarefaModel.listar();
}

async function editarTarefaService(id, data) {
  return await TarefaModel.atualizar(id, data);
}

async function excluirTarefaService(id) {
  return await TarefaModel.excluir(id);
}

module.exports = {
  criarTarefaService,
  listarTarefasService,
  editarTarefaService,
  excluirTarefaService,
};