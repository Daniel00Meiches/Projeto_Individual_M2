// Cria um mock (substituto) do TarefaModel
const mockTarefaModel = {
  criar: jest.fn(),
  listar: jest.fn(),
  atualizar: jest.fn(),
  excluir: jest.fn()
};

// Usa o mock no lugar do Model real
jest.mock('../../src/models/TarefaModel', () => mockTarefaModel);

// Importa as funções do service que usa o mock
const {
  criarTarefaService,
  listarTarefasService,
  editarTarefaService,
  excluirTarefaService
} = require('../../src/services/TarefaService');

describe('TarefaService com mocks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma tarefa chamando o model', async () => {
    const novaTarefa = {
      titulo: 'Nova tarefa',
      descricao: '',
      data_criada: new Date(),
      data_de_entrega: null,
      concluido: false,
      id_usuario: 1
    };

    const respostaSimulada = { id: 1, ...novaTarefa };
    mockTarefaModel.criar.mockResolvedValue(respostaSimulada);

    const resultado = await criarTarefaService(novaTarefa);

    expect(mockTarefaModel.criar).toHaveBeenCalledWith(novaTarefa);
    expect(resultado).toEqual(respostaSimulada);
  });

  it('deve listar tarefas chamando o model', async () => {
    const tarefas = [{ id: 1, titulo: 'Tarefa 1' }];
    mockTarefaModel.listar.mockResolvedValue(tarefas);

    const resultado = await listarTarefasService();

    expect(mockTarefaModel.listar).toHaveBeenCalled();
    expect(resultado).toEqual(tarefas);
  });

  it('deve editar uma tarefa chamando o model', async () => {
    const dadosAtualizados = {
      titulo: 'Atualizado',
      descricao: 'Nova descrição',
      data_de_entrega: new Date(),
      concluido: true
    };

    const id = 1;
    const resposta = { id, ...dadosAtualizados };

    mockTarefaModel.atualizar.mockResolvedValue(resposta);

    const resultado = await editarTarefaService(id, dadosAtualizados);

    expect(mockTarefaModel.atualizar).toHaveBeenCalledWith(id, dadosAtualizados);
    expect(resultado).toEqual(resposta);
  });

  it('deve excluir uma tarefa', async () => {
    const tarefa = { id: 2, titulo: 'Excluir' };
    mockTarefaModel.excluir.mockResolvedValue(tarefa);

    const resultado = await excluirTarefaService(2);

    expect(mockTarefaModel.excluir).toHaveBeenCalledWith(2);
    expect(resultado).toEqual(tarefa);
  });
});