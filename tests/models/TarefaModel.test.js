// Importa o TarefaModel que contém o schema Joi
const TarefaModel = require('../../src/models/TarefaModel');

describe('Validação do schema de TarefaModel', () => {
  const dadosValidos = {
    titulo: 'Estudar testes com Jest',
    descricao: 'Focar em testes de unidade',
    data_criada: new Date(),
    data_de_entrega: new Date(),
    concluido: false,
    id_usuario: 1
  };

  it('aceita dados válidos', () => {
    const { error } = TarefaModel.schema.validate(dadosValidos);
    expect(error).toBeUndefined();
  });

  it('falha se faltar o título', () => {
    const { error } = TarefaModel.schema.validate({
      ...dadosValidos,
      titulo: undefined
    });
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/"titulo"/);
  });

  it('falha se id_usuario não for número', () => {
    const { error } = TarefaModel.schema.validate({
      ...dadosValidos,
      id_usuario: 'abc'
    });
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/"id_usuario"/);
  });

  it('aceita descrição vazia', () => {
    const { error } = TarefaModel.schema.validate({
      ...dadosValidos,
      descricao: ''
    });
    expect(error).toBeUndefined();
  });
});