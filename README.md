## Descrição do Sistema:

O sistema desenvolvido será um gerenciador de tarefas não colaborativo. Usuários poderão criar tarefas, que são blocos onde podem incluir informações necessárias para completarem seus objetivos. Tais informações incluem a descrição da tarefa, uma data de entrega (caso aplicável) e subtarefas que permitirão mais precisão quando considerando componentes restantes para que a tarefa seja completada.

## Estrutura de Pastas:

```
PROJETO_INDIVIDUAL_M2
├── 📁 assets
│   ├── modelo_banco.png
│   └── diagrama_mvc.png
├── 📁 node_modules
├── 📁 styles
├── 📁 tests
│   ├── tarefa.test.js
│   └── user.test.js
├── 📁 src
│   ├── 📁 config
│   │   └── db.js
│   ├── 📁 controllers
│   │   ├── SubtarefaController.js
│   │   ├── TarefaController.js
│   │   └── UserController.js
│   ├── 📁 models
│   │   ├── UserModel.js
│   │   ├── TarefaModel.js
│   │   └── SubtarefaModel.js
│   ├── 📁 public
│   │   ├── styles.css
│   │   ├── tarefas.js
│   │   └── subtarefas.js
│   ├── 📁 repositories
│   │   ├── UserRepository.js
│   │   ├── TarefaRepository.js
│   │   └── SubtarefaRepository.js
│   ├── 📁 routes
│   │   └── index.js
│   ├── 📁 scripts
│   │   ├── init.sql
│   │   └── runsql.js
│   ├── 📁 services
│   │   ├── UserService.js
│   │   ├── TarefaService.js
│   │   └── SubtarefaService.js
│   └── 📁 views
│       ├── documentacao.html
│       ├── index.ejs
│       └── registro.ejs
├── .env
├── .env.example
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── rest.http
├── server.js
└── wad.md
```

## Execução do projeto localmente

Pré-Requisitos:
- Certifique que o Git está instalado.
- Instale [Node.js](https://nodejs.org/pt).
- Instale o [PostgreSQL](https://www.postgresql.org/).

Execução:

1- Clonagem do repositório
```
// Clonagem feita com Github CLI
gh repo clone Daniel00Meiches/Projeto_Individual_M2
cd Projeto_Individual_M2
```

2- Instale as dependências
```
npm install
```

3- Configuração do ambiente
Crie um arquivo .env na raiz do projeto com as seguintes variáveis, adaptadas ao seu ambiente PostgreSQL local:
```
DB_HOST= //localhost
DB_PORT= //número da porta
DB_USER= //seu usuário postgres
DB_PASSWORD= //sua senha postgres
DB_DATABASE= //nome do banco de dados que você utilizará que deve bater com a sua instância local do PostgreSQL
```

4- Criação do banco de dados
Você pode criar o banco de dados diretamente no PostgreSQL utilizando o terminal ou uma ferramenta como o pgAdmin. Exemplo via terminal:
```
psql -U seu_usuario_postgres
CREATE DATABASE projeto_m2;
```
Depois, execute o script de migração:
```
npm run migration
```

5- Execute o servidor
Depois de ter tudo configurado, você pode iniciar o servidor assim:
```
npm start
```
Você deve ver algo como:
```
Servidor escutando em http://localhost:3000
```
Abra esse endereço no navegador ou use ferramentas como Postman para testar as rotas da API.