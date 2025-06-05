const TarefaRepository = require('../repositories/TarefaRepository');

async function criarTarefaService(data) {
  return await TarefaRepository.criar(data);
}

async function listarTarefasService() {
  return await TarefaRepository.listar();
}

async function editarTarefaService(id, data) {
  return await TarefaRepository.atualizar(id, data);
}

async function excluirTarefaService(id) {
  return await TarefaRepository.excluir(id);
}

module.exports = {
  criarTarefaService,
  listarTarefasService,
  editarTarefaService,
  excluirTarefaService,
};