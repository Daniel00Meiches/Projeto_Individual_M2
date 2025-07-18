const UserModel = require('../models/UserModel');
const TarefaModel = require('../models/TarefaModel');
const SubtarefaModel = require('../models/SubtarefaModel');

async function criarUserService(data) {
  return UserModel.criar(data);
}

async function listarUsersService() {
  return UserModel.listar();
}

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
  excluirUserService,
};