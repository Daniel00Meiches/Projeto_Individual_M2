// Importa o UserModel para usar o schema de validação com Joi
const UserModel = require('../../src/models/UserModel');

describe('Validação do schema de UserModel', () => {
  // Objeto de dados válidos para base dos testes
  const dadosValidos = {
    username: 'usuario_exemplo',
    email: 'usuario@email.com',
    senha_hash: 'senha123'
  };

  it('aceita dados válidos', () => {
    // Usa o método Joi para validar os dados
    const { error } = UserModel.schema.validate(dadosValidos);

    // Espera que não haja erro, ou seja, os dados são válidos
    expect(error).toBeUndefined();
  });

  it('falha se username for muito curto', () => {
    // Faz username com apenas 2 letras (mínimo é 3)
    const { error } = UserModel.schema.validate({
      ...dadosValidos,
      username: 'ab'
    });

    // Espera erro, pois é inválido
    expect(error).toBeDefined();
  });

  it('falha se email for inválido', () => {
    // Fornece um email sem "@" e domínio
    const { error } = UserModel.schema.validate({
      ...dadosValidos,
      email: 'emailinvalido'
    });

    // Espera erro por formato de email errado
    expect(error).toBeDefined();
  });

  it('falha se senha_hash estiver vazia', () => {
    // Coloca string vazia na senha
    const { error } = UserModel.schema.validate({
      ...dadosValidos,
      senha_hash: ''
    });

    // Espera erro por senha ser obrigatória
    expect(error).toBeDefined();
  });
});