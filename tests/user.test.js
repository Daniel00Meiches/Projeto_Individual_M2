const request = require('supertest');
const app = require('../server');

describe('Teste da API de usuários', () => {
  it('Deve criar um usuário via POST /api/app_users', async () => {
    const novoUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      senha_hash: '123456'
    };

    const response = await request(app)
      .post('/api/app_users')
      .send(novoUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(novoUser.username);
    expect(response.body.email).toBe(novoUser.email);
  });
});
