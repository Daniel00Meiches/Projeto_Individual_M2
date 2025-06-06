const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./src/routes/index.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

module.exports = app;