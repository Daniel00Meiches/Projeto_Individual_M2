const mockSubtarefaModel = {
  criar: jest.fn(),
  listar: jest.fn(),
  atualizar: jest.fn(),
  excluir: jest.fn()
};

// Substitui o model original pelo mock
jest.mock('../../src/models/SubtarefaModel', () => mockSubtarefaModel);

// Importa funções do serviço com mock injetado
const {
  criarSubtarefaService,
  listarSubtarefasService,
  editarSubtarefaService,
  excluirSubtarefaService
} = require('../../src/services/SubtarefaService');

describe('SubtarefaService com mocks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('cria subtarefa chamando o model', async () => {
    const dados = {
      title: 'Sub',
      descricao: '',
      ordem: 1,
      concluido: false,
      id_tarefa: 1
    };

    const resposta = { id: 1, ...dados };
    mockSubtarefaModel.criar.mockResolvedValue(resposta);

    const resultado = await criarSubtarefaService(dados);

    expect(mockSubtarefaModel.criar).toHaveBeenCalledWith(dados);
    expect(resultado).toEqual(resposta);
  });

  it('lista subtarefas chamando o model', async () => {
    const lista = [{ id: 1, title: 'Sub 1' }];
    mockSubtarefaModel.listar.mockResolvedValue(lista);

    const resultado = await listarSubtarefasService();

    expect(mockSubtarefaModel.listar).toHaveBeenCalled();
    expect(resultado).toEqual(lista);
  });

  it('edita subtarefa chamando o model', async () => {
    const id = 1;
    const dados = {
      title: 'Novo título',
      descricao: 'Atualizada',
      concluido: true
    };
    const resposta = { id, ...dados };

    mockSubtarefaModel.atualizar.mockResolvedValue(resposta);

    const resultado = await editarSubtarefaService(id, dados);

    expect(mockSubtarefaModel.atualizar).toHaveBeenCalledWith(id, dados);
    expect(resultado).toEqual(resposta);
  });

  it('exclui subtarefa chamando o model', async () => {
    const subtarefa = { id: 3, title: 'Excluir' };
    mockSubtarefaModel.excluir.mockResolvedValue(subtarefa);

    const resultado = await excluirSubtarefaService(3);

    expect(mockSubtarefaModel.excluir).toHaveBeenCalledWith(3);
    expect(resultado).toEqual(subtarefa);
  });
});