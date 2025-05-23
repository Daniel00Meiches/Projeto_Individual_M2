const request = require('supertest');
const app = require('../server');
const db = require('../src/config/db');

describe('CRUD de Tarefas', () => {
  let idCriado;
  let idUsuario;

  // Criar um usuário antes de tudo (tarefa depende dele)
  beforeAll(async () => {
    const res = await db.query(`
      INSERT INTO app_user (username, email, senha_hash)
      VALUES ($1, $2, $3)
      RETURNING id
    `, ['tester', 'teste@teste.com', 'senha123']);
    
    idUsuario = res.rows[0].id;
  });

  afterAll(async () => {
    await db.query('DELETE FROM tarefa');
    await db.query('DELETE FROM app_user WHERE id = $1', [idUsuario]);
    await db.connect().then(client => client.release());
  });

  test('POST /api/tarefas - Criar tarefa', async () => {
    const res = await request(app)
      .post('/api/tarefas')
      .send({
        titulo: 'Testando Tarefa',
        descricao: 'Descrição da tarefa',
        data_criada: new Date().toISOString().split('T')[0],
        data_de_entrega: '2025-12-31',
        concluido: false,
        id_usuario: idUsuario,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Testando Tarefa');
    idCriado = res.body.id;
  });

  test('GET /api/tarefas - Listar tarefas', async () => {
    const res = await request(app).get('/api/tarefas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/tarefas/:id - Editar tarefa', async () => {
    const res = await request(app)
      .put(`/api/tarefas/${idCriado}`)
      .send({
        titulo: 'Tarefa Atualizada',
        descricao: 'Descrição atualizada',
        data_de_entrega: '2026-01-01',
        concluido: true,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Tarefa Atualizada');
  });

  test('DELETE /api/tarefas/:id - Excluir tarefa', async () => {
    const res = await request(app).delete(`/api/tarefas/${idCriado}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarefa excluída com sucesso');
  });
});