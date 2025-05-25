# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do projeto

#### Autor do projeto

Daniel Meiches

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O projeto que vou desenvolver será um sistema de gerenciamento de projetos. Nele, o usuário poderá criar tarefas e criar atributos (ou subtarefas) que serão incrementos para o desenvolvimento da tarefa principal. O sistema será desenvolvido com Javascript, SQL, HTTL e HTTP e poderá ser rodado através do Node.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

#### MODELO RELACIONAL:

<img src="./assets/modelo_banco.png">

Esse modelo contém 3 tabelas, que guardarão informações relevantes para o meu sistema de gerenciamento individual. A primeira delas é a ```user```, que contém informações do usuário como seu username, email e senha na forma de hash. A segunda tabela, ```tarefa```, conterá informações de uma tarefa principal que o usuário criará, como título e descrição, data criada, data de entrega e se a tarefa foi concluída. Por último, a tabela ```subtarefa``` tem informações de tarefas contidas dentro das tarefas principais, que são título e descrição, ordem numérica da subtarefa e se foi concluída.

As 3 tabeles contém um atributo ```id``` que funcionará como a chave primária. As tabelas ```tarefa``` e ```subtarefa``` tem chaves estrangeiras que as conectarão às tabelas ```user``` e ```tarefa```, respectivamente.

A relação entre as tabelas ```user``` e ```tarefa``` é 1:N e a relação entre as tabelas ```tarefa``` e ```subtarefa``` é 1:N. Isso quer dizer que um usuário consegue criar várias tarefas, assim como dentro de uma tarefa, várias subtarefas podem ser criadas.

#### MODELO FÍSICO:
```
CREATE TABLE IF NOT EXISTS app_user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(55),
  email VARCHAR(200),
  senha_hash VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS tarefa (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(256),
  descricao TEXT,
  data_criada DATE NOT NULL,
  data_de_entrega DATE,
  concluido BOOLEAN DEFAULT FALSE,
  id_usuario INTEGER,
  FOREIGN KEY (id_usuario) REFERENCES app_user(id)
);

CREATE TABLE IF NOT EXISTS subtarefa (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256),
  descricao TEXT,
  ordem INTEGER NOT NULL,
  concluido BOOLEAN DEFAULT FALSE,
  id_tarefa INTEGER,
  FOREIGN KEY (id_tarefa) REFERENCES tarefa(id)
);
```

### 3.1.1 BD e Models (Semana 5)

#### Modelo do Usuário:

- ```id```: PK
- ```username```: o nome que o usuário definiu para si mesmo no sistema.
- ```email```: o email que o usuário inseriu para fazer login.
- ```senha_hash```: representação alfanumérica de comprimento fixo da senha do usuário.


#### Modelo de Tarefa:

- ```id```: PK
- ```titulo```: título que o usuário definiu para certa tarefa.
- ```descricao```: descrição que o usuário definiu para certa tarefa.
- ```data_criada```: data que a tarefa foi criada.
- ```data_de_entrega```: prazo para entrega da tarefa que o usuário definiu, caso aplicável.
- ```concluido```: valor booleano que definirá se a tarefa foi concluída.
- ```id_usuario```: FK que referencia o ```id``` no modelo do usuário.


#### Modelo de Subtarefa:

- ```id```: PK
- ```title```: título para a subtarefa de uma certa tarefa.
- ```descricao```: descrição que o usuário definiu para certa subtarefa.
- ```ordem```: um número que indicará a ordem de prioridade da subtarefa.
- ```concluido```: valor booleano que definirá se a subtarefa foi concluída.
- ```id_tarefa```: FK que referencia o ```id``` no modelo da tarefa.


### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

#### Endpoints do Usuários

- POST /api/app_users
Criação de um usuário. Exemplo de corpo da requisição:
```
{
  "username": "taskmaster4",
  "email": "adorotarefas@exemplo.com",
  "senha_hash": "0123senh4"
}
```

- GET /api/app_users
Mostra lista de todos os usuários cadastrados no sistema.

- PUT /api/app_users/:id
Atualiza algum campo de informação do usuário com base no seu ID.

- DELETE /api/app_users/:id
Apaga a conta de um usuário com base no seu ID.

#### Endpoints da Tarefa

- POST /api/tarefas
Criação de uma tarefa. Exemplo de corpo da requisição:
```
{
  "titulo": "Atividade Ponderada",
  "descricao": "Preciso entregar uma atividade ponderada de programação",
  "data_criada": "2025-05-22",
  "data_de_entrega": "2025-06-01",
  "concluido": false,
  "id_usuario": 1
}
```

- GET /api/tarefas
Mostra lista de todas tarefas criadas por um usuário (é possível qual tarefa pertence a um certo usuário pelo ID do usuário).

- PUT /api/tarefas/:id
Atualiza algum campo de informação da tarefa com base no seu ID.

- DELETE /api/tarefas/:id
Apaga uma tarefa com base no seu ID.

#### Endpoints da Subtarefa

- POST /api/subtarefas
Criação de uma subtarefa. Exemplo de corpo da requisição:
```
{
  "title": "Acabar a documentação",
  "descricao": "Vou acabar a documentação do WAD",
  "ordem": 1,
  "concluido": false,
  "id_tarefa": 1
}
```

- GET /api/subtarefas
Mostra lista de todas subtarefas criadas por um usuário (é possível qual subtarefa pertence a uma certa tarefa pelo ID da tarefa).

- PUT /api/subtarefas/:id
Atualiza algum campo de informação da subtarefa com base no seu ID.

- DELETE /api/subtarefas/:id
Apaga uma subtarefa com base no seu ID.

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---