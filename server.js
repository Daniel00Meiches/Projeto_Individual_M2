const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./src/routes/index.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

module.exports = app;