const express = require('express'); // Importa o Express para usar seu sistema de roteamento
const router = express.Router();    // Cria um roteador. Ele funciona como uma mini-instância do express focada apenas em rotas. Permite organizar rotas em módulos, sem poluir o server.js

// Exemplo de rota
router.get('/', (req, res) => {
  res.send('Rota principal funcionando!');
});

module.exports = router; // Exporta o roteador para ser usado em outros arquivos — como no server.js