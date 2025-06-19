## Descrição do Sistema:

O sistema desenvolvido é um gerenciador de tarefas não colaborativo. Usuários precisam fazer login para criarem tarefas, que são blocos com informações importantes para o cumprimento de objetivos, como a descrição e uma data de entrega (caso aplicável). Cada tarefa pode conter uma subtarefa, permitindo maior precisão no acompanhamento de componentes necessários para a conclusão da tarefa principal.

## Vídeo de Demonstração

https://youtu.be/qiuQcah67gc

## Estrutura de Pastas:

```
PROJETO_INDIVIDUAL_M2
├── 📁 assets
│   ├── modelo_banco.png
│   └── diagrama_mvc.png
├── 📁 node_modules
├── 📁 tests
│   ├── 📁 models
│   │   ├── UserModel.test.js
│   │   ├── TarefaModel.test.js
│   │   └── SubtarefaModel.test.js
│   ├── 📁 services
│   │   ├── UserService.test.js
│   │   ├── TarefaService.test.js
│   │   └── SubtarefaService.test.js
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
│   │   ├── subtarefas.js
│   │   └── usuario.js
│   ├── 📁 routes
│   │   └── index.js
│   ├── 📁 scripts
│   │   ├── exemplo.sql
│   │   ├── init.sql
│   │   └── runsql.js
│   ├── 📁 services
│   │   ├── UserService.js
│   │   ├── TarefaService.js
│   │   └── SubtarefaService.js
│   └── 📁 views
│       ├── index.ejs
│       └── registro.ejs
├── .env
├── .env.example
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── wad.md
```

## Execução do projeto localmente

### Pré-Requisitos:
- Certifique que o Git está instalado.
- Instale [Node.js](https://nodejs.org/pt).
- Instale o [PostgreSQL](https://www.postgresql.org/).

### Execução:

#### 1- Clonagem do repositório
```
// Clonagem feita com Github CLI
gh repo clone Daniel00Meiches/Projeto_Individual_M2
cd Projeto_Individual_M2
```

#### 2- Instale as dependências
```
npm install express cors body-parser better-sqlite3 pg dotenv joi ejs
```
Explicação breve das dependências:

```express```: framework para criar servidores web e APIs de forma simples.

```cors```: middleware que permite ao servidor controlar quais origens (domínios) podem acessar a API.

```body-parser```: permite interpretar o corpo das requisições (formulários, JSON etc).

```better-sqlite3```: biblioteca para usar SQLite de forma rápida e sincronizada (pode ser usada em testes ou ambiente local).

```pg```: cliente PostgreSQL para Node.js, utilizado para interagir com o banco de dados.

```dotenv```: carrega variáveis de ambiente definidas em um arquivo .env.

```joi```: biblioteca para validação de dados recebidos (ex.: checagem de tipos, formatos etc).

```ejs```: motor de templates que gera páginas HTML dinâmicas no servidor.

#### 3- Configuração do ambiente
Crie um arquivo .env na raiz do projeto com as seguintes variáveis, adaptadas ao seu ambiente PostgreSQL local:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

#### 4- Criação do banco de dados
Você pode criar o banco de dados diretamente no PostgreSQL utilizando o terminal ou uma ferramenta como o pgAdmin. Exemplo via terminal:
```
psql -U seu_usuario_postgres
CREATE DATABASE projeto_m2;
```
Depois, execute o script de migração:
```
npm run migration
```

#### 5- Execute o servidor
Depois de ter tudo configurado, você pode iniciar o servidor assim:
```
npm start
```
Você deve ver algo como:
```
> projeto_individual_m2@1.0.0 start
> node server.js

Servidor escutando em http://localhost:3000
```
Finalmente, cole o endereço ```http://localhost:3000``` no seu navegador para acessar o sistema web.