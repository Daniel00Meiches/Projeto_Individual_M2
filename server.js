// O Express é um framework web para Node.js que simplifica a criação de aplicativos web, fornecendo recursos para roteamento, middleware e tratamento de solicitações e respostas HTTP

const express = require('express');       // Importa o framework Express, que facilita criar um servidor HTTP em Node.js
const app = express();                    // Cria uma instância da aplicação Express. Essa variável app representa o servidor
const PORT = 3000;                        // Define a porta em que o servidor vai rodar (neste caso, porta 3000).

// Middleware para processar JSON
app.use(express.json());

// Rotas
const routes = require('./routes/index'); // Importa o módulo de rotas que está no arquivo index.js dentro da pasta routes
app.use('/', routes);                     // Diz ao Express: “todas as requisições para / (ou qualquer subrota) devem ser tratadas pelo que está no routes”. Como routes é um router exportado de index.js, o Express vai delegar para ele

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});