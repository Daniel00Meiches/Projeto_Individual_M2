const UserRepository = require('../repositories/UserRepository');

async function criarUserService(data) {
  return UserRepository.criar(data);
}

async function listarUsersService() {
  return UserRepository.listar();
}

async function editarUserService(id, data) {
  return UserRepository.atualizar(id, data);
}

async function excluirUserService(id) {
  return UserRepository.excluir(id);
}

module.exports = {
  criarUserService,
  listarUsersService,
  editarUserService,
  excluirUserService,
};