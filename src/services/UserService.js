const UserModel = require('../models/UserModel');
const TarefaModel = require('../models/TarefaModel');
const SubtarefaModel = require('../models/SubtarefaModel');

async function criarUserService(data) {
  return UserModel.criar(data);
}

async function listarUsersService() {
  return UserModel.listar();
}

async function editarUserService(id, data) {
  return UserModel.atualizar(id, data);
}

// Essa você já tem:
async function excluirUserService(id) {
  const tarefas = await TarefaModel.buscarPorUsuarioId(id);
  for (const tarefa of tarefas) {
    await SubtarefaModel.excluirPorTarefaId(tarefa.id);
  }
  await TarefaModel.excluirPorUsuarioId(id);
  return UserModel.excluir(id);
}

module.exports = {
  criarUserService,
  listarUsersService,
  editarUserService,
  excluirUserService,
};