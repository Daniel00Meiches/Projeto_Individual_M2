// routes/index.js
const express = require('express'); // Importa o Express para usar seu sistema de roteamento
const router = express.Router();    // Cria um roteador. Ele funciona como uma mini-instância do express focada apenas em rotas. Permite organizar rotas em módulos, sem poluir o server.js
const UserController = require('../controllers/UserController');
const TarefaController = require('../controllers/TarefaController');
const SubtarefaController = require('../controllers/SubtarefaController')

// Rotas para o CRUD de users
router.post('/app_users', UserController.criarUser);
router.get('/app_users', UserController.listarUser);
router.put('/app_users/:id', UserController.editarUser);
router.delete('/app_users/:id', UserController.excluirUser);

// Rotas para o CRUD de tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

// Rotas para o CRUD de subtarefas
router.post('/subtarefas', SubtarefaController.criarSubtarefa);
router.get('/subtarefas', SubtarefaController.listarSubtarefas);
router.put('/subtarefas/:id', SubtarefaController.editarSubtarefa);
router.delete('/subtarefas/:id', SubtarefaController.excluirSubtarefa);

module.exports = router; // Exporta o roteador para ser usado em outros arquivos — como no server.js