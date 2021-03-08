SET IDENTITY_INSERT dbo.TCC OFF
SET IDENTITY_INSERT dbo.Usuario ON
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (0, 'Joir Medeiros Medeiros','STUDENT','joir@gmail.com','1234');
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (1, 'Ronaldo de Figueiredo Silveira','STUDENT','ronis@gmail.com','1234');
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (2, 'Marcel Vinicius Medeiros Oliveira','PROFESSOR','marcel@gmail.com','1234');
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (3, 'Monica Magalh�es Pereira','PROFESSOR','monica@gmail.com','1234');
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (4, 'Lucas Torres de Souza','STUDENT','torres@gmail.com','1234');
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (5, 'admin','ADMIN','admin@gmail.com','1234');
insert into dbo.Usuario
                    (id, username,usertype,email,passwd)
                    values
                    (6, 'Jos� Gameleira do R�go Neto','STUDENT','gameleira@gmail.com','1234');

SET IDENTITY_INSERT dbo.Usuario OFF
SET IDENTITY_INSERT dbo.TCC ON

insert into dbo.TCC (id, title, author_id, professor_id, approved, keywords, abstract, date_creation, fileID)
                    values
                    (10, 'Nova Arquitetura de ambientes de ',
                    0, 2, 'True', '{"Arquitetura de Banco de dados", "Arquitetura de Microsservi�o", "Arquitetura Monol�tica"}',
                    'Incididunt culpa laborum amet Lorem ea cupidatat adipisicing. Voluptate excepteur do cupidatat eiusmod non. In consequat ea aliquip.',
                    '2019-08-23', 0)
insert into dbo.TCC (id, title, author_id, professor_id, approved, keywords, abstract, date_creation, fileID)
                    values
                    (11, 'Projeto e implementa��o de um ',
                    1, 3, 'True', '{"Acelerador", "Arquitetura Reconfigur�vel", "Arquitetura de Computadores"}',
                    'Incididunt culpa laborum amet Lorem ea cupidatat adipisicing. Voluptate excepteur do cupidatat eiusmod non. In consequat ea aliquip.',
                    '2019-06-10', 1)
insert into dbo.TCC (id, title, author_id, professor_id, approved, keywords, abstract, date_creation, fileID)
                    values
                    (12, 'Procedural terrain ',
                    4, 3, 'True', '{"Gera��o Procedural de Terrenos", "Procedural Terrain Generation", "Comple��o de Imagens"}',
                    'Incididunt culpa laborum amet Lorem ea cupidatat adipisicing. Voluptate excepteur do cupidatat eiusmod non. In consequat ea aliquip.',
                    '2019-07-23', 2)
insert into dbo.TCC (id, title, author_id, professor_id, approved, keywords, abstract, date_creation, fileID)
                    values
                    (13, 'Usando t�cnicas de minera��o de ',
                    6, 2, 'True', '{"testes de software", "software testing", "automa��o de testes", "test automation"}',
                    'Incididunt culpa laborum amet Lorem ea cupidatat adipisicing. Voluptate excepteur do cupidatat eiusmod non. In consequat ea aliquip.',
                    '2019-06-13', 3)