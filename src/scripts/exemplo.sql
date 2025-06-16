INSERT INTO app_user (username, email, senha_hash) VALUES
('joao123', 'joao@email.com', 'hashsenha1');

INSERT INTO tarefa (titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario) VALUES
('Estudar PostgreSQL', 'Estudar comandos básicos e avançados', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', false, 1);

INSERT INTO subtarefa (title, descricao, ordem, concluido, id_tarefa) VALUES
('Instalar PostgreSQL', 'Instalar no sistema local', 1, true, 1),
('Aprender SELECT', 'Fazer consultas simples', 2, false, 1);