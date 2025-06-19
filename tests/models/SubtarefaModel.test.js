const SubtarefaModel = require('../../src/models/SubtarefaModel');

describe('Validação do schema de SubtarefaModel', () => {
  const dadosValidos = {
    title: 'Subtarefa 1',
    descricao: 'Detalhes',
    ordem: 1,
    concluido: false,
    id_tarefa: 1
  };

  it('aceita dados válidos', () => {
    const { error } = SubtarefaModel.schema.validate(dadosValidos);
    expect(error).toBeUndefined();
  });

  it('falha se faltar o título', () => {
    const { error } = SubtarefaModel.schema.validate({
      ...dadosValidos,
      title: undefined
    });
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/"title"/);
  });

  it('falha se ordem não for número', () => {
    const { error } = SubtarefaModel.schema.validate({
      ...dadosValidos,
      ordem: 'um'
    });
    expect(error).toBeDefined();
  });

  it('aceita descrição vazia', () => {
    const { error } = SubtarefaModel.schema.validate({
      ...dadosValidos,
      descricao: ''
    });
    expect(error).toBeUndefined();
  });
});