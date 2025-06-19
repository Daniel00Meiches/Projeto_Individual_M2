// Primeiro criamos os mocks (substitutos) dos models usados no service
const mockUserModel = {
  criar: jest.fn(),     // simula função de criação
  listar: jest.fn(),    // simula função de listagem
  excluir: jest.fn()    // simula função de exclusão
};

const mockTarefaModel = {
  buscarPorUsuarioId: jest.fn(),
  excluirPorUsuarioId: jest.fn()
};

const mockSubtarefaModel = {
  excluirPorTarefaId: jest.fn()
};

// Mocks dos arquivos que o UserService importa
jest.mock('../../src/models/UserModel', () => mockUserModel);
jest.mock('../../src/models/TarefaModel', () => mockTarefaModel);
jest.mock('../../src/models/SubtarefaModel', () => mockSubtarefaModel);

// Importa a função que vamos testar — agora ela vai usar os mocks
const {
  criarUserService,
  listarUsersService,
  excluirUserService
} = require('../../src/services/UserService');

describe('Testes do UserService com mocks', () => {
  // Garante que os mocks estão "limpos" antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um usuário chamando UserModel.criar', async () => {
    const dadosUsuario = {
      username: 'joaozinho',
      email: 'joao@email.com',
      senha_hash: 'senha'
    };

    const respostaSimulada = { id: 1, ...dadosUsuario };

    // Simula que UserModel.criar retorna respostaSimulada
    mockUserModel.criar.mockResolvedValue(respostaSimulada);

    const resultado = await criarUserService(dadosUsuario);

    // Verifica se o método foi chamado corretamente
    expect(mockUserModel.criar).toHaveBeenCalledWith(dadosUsuario);
    // Verifica se o resultado é o que esperamos
    expect(resultado).toEqual(respostaSimulada);
  });

  it('deve listar usuários chamando UserModel.listar', async () => {
    const listaSimulada = [{ id: 1, username: 'joao' }];

    mockUserModel.listar.mockResolvedValue(listaSimulada);

    const resultado = await listarUsersService();

    expect(mockUserModel.listar).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(listaSimulada);
  });

  it('deve excluir usuário, tarefas e subtarefas na ordem correta', async () => {
    const tarefasMock = [
      { id: 10, titulo: 'Tarefa A' },
      { id: 11, titulo: 'Tarefa B' }
    ];

    // Simula que busca retorna tarefas associadas ao usuário
    mockTarefaModel.buscarPorUsuarioId.mockResolvedValue(tarefasMock);

    // Simula que o UserModel.excluir retorna usuário excluído
    mockUserModel.excluir.mockResolvedValue({ id: 99 });

    const resultado = await excluirUserService(5); // ID do usuário

    // Verifica se subtarefas foram excluídas por tarefa
    expect(mockSubtarefaModel.excluirPorTarefaId).toHaveBeenCalledWith(10);
    expect(mockSubtarefaModel.excluirPorTarefaId).toHaveBeenCalledWith(11);

    // Verifica se tarefas foram excluídas por usuário
    expect(mockTarefaModel.excluirPorUsuarioId).toHaveBeenCalledWith(5);

    // Verifica se usuário foi excluído
    expect(mockUserModel.excluir).toHaveBeenCalledWith(5);

    // Verifica retorno final
    expect(resultado).toEqual({ id: 99 });
  });
});