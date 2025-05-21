## Descrição do Sistema:

O sistema desenvolvido será um gerenciador de tarefas não colaborativo. Usuários poderão criar tarefas, que são blocos onde podem incluir informações necessárias para completarem seus objetivos. Tais informações incluem a descrição da tarefa, uma data de entrega (caso aplicável) e subtarefas que permitirão mais precisão quando considerando componentes restantes para que a tarefa seja completada.

## Estrutura de Pastas:

```
PROJETO_INDIVIDUAL_M2
├── 📁 assets
│   └── modelo_banco.png
├── 📁 node_modules
├── 📁 styles
├── 📁 tests
│   └── example.test.js
├── 📁 src
│   ├── 📁 config
│   │   └── db.js
│   ├── 📁 controllers
│   │   └── HomeController.js
│   │   ├── SubtarefaController.js
│   │   ├── TarefaController.js
│   │   └── UserController.js
│   ├── 📁 models
│   │   └── User.js
│   ├── 📁 routes
│   │   └── index.js
│   ├── 📁 scripts
│   │   ├── init.sql
│   │   └── runsql.js
│   └── 📁 services
│       └── userService.js
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

1. Clonagem do repositório
```
// Clonagem feita com Github CLI
gh repo clone Daniel00Meiches/Projeto_Individual_M2
cd Projeto_Individual_M2
```

2. Instale as dependências
```
npm install
```

3. Configuração do ambiente

*proxima etapa*

4. Criação do banco de dados

*proxima etapa*

5. Execute o servidor

*proxima etapa*