CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(55),
  email VARCHAR(200),
  senha_hash VARCHAR(30),
);

CREATE TABLE IF NOT EXISTS tarefa (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(256),
  descricao TEXT,
  data_criada DATE NOT NULL,
  data_de_entrega DATE,
  concluido BOOLEAN DEFAULT FALSE,
  id_usuario INTEGER,
  FOREIGN KEY (id_usuario) REFERENCES user(id)
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