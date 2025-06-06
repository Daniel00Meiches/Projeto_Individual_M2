const UserRepository = require('../repositories/UserRepository');
const TarefaRepository = require('../repositories/TarefaRepository');
const SubtarefaRepository = require('../repositories/SubtarefaRepository');

async function criarUserService(data) {
  return UserRepository.criar(data);
}

async function listarUsersService() {
  return UserRepository.listar();
}

async function editarUserService(id, data) {
  return UserRepository.atualizar(id, data);
}

// Essa você já tem:
async function excluirUserService(id) {
  const tarefas = await TarefaRepository.buscarPorUsuarioId(id);
  for (const tarefa of tarefas) {
    await SubtarefaRepository.excluirPorTarefaId(tarefa.id);
  }
  await TarefaRepository.excluirPorUsuarioId(id);
  return UserRepository.excluir(id);
}

module.exports = {
  criarUserService,
  listarUsersService,
  editarUserService,
  excluirUserService,
};