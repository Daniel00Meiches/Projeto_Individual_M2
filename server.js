// O Express é um framework web para Node.js que simplifica a criação de aplicativos web, fornecendo recursos para roteamento, middleware e tratamento de solicitações e respostas HTTP
const express = require('express');                      // Importa o framework Express, que facilita criar um servidor HTTP em Node.js
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/index.js');         // Importa o módulo de rotas que está no arquivo index.js dentro da pasta routes
const app = express();                                   // Cria uma instância da aplicação Express. Essa variável app representa o servidor
const port = 3000;                                       // Define a porta em que o servidor vai rodar (neste caso, porta 3000)

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api', routes);                                 // Diz ao Express: “todas as requisições para a subrota /api devem ser tratadas pelo que está no routes”. Como routes é um router exportado de index.js, o Express vai delegar para ele

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});