const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const TarefaController = require('../controllers/TarefaController');
const SubtarefaController = require('../controllers/SubtarefaController');

router.post('/app_users', UserController.criarUser);
router.get('/app_users', UserController.listarUser);
router.delete('/app_users/:id', UserController.excluirUser);

router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

router.post('/subtarefas', SubtarefaController.criarSubtarefa);
router.get('/subtarefas', SubtarefaController.listarSubtarefas);
router.put('/subtarefas/:id', SubtarefaController.editarSubtarefa);
router.delete('/subtarefas/:id', SubtarefaController.excluirSubtarefa);

module.exports = router;