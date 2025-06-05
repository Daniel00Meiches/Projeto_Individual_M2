const SubtarefaRepository = require('../repositories/SubtarefaRepository');

async function criarSubtarefaService(data) {
  return await SubtarefaRepository.criar(data);
}

async function listarSubtarefasService() {
  return await SubtarefaRepository.listar();
}

async function editarSubtarefaService(id, data) {
  return await SubtarefaRepository.atualizar(id, data);
}

async function excluirSubtarefaService(id) {
  return await SubtarefaRepository.excluir(id);
}

module.exports = {
  criarSubtarefaService,
  listarSubtarefasService,
  editarSubtarefaService,
  excluirSubtarefaService,
};