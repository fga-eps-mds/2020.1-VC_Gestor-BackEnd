DROP SCHEMA IF EXISTS public; 
CREATE SCHEMA resolution;   

CREATE TABLE resolution.user (
	"user_id" integer NOT NULL,
	"name" varchar(20) NOT NULL,
	"surname" varchar(20) NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar(20) NOT NULL,
	"email" varchar(25) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE resolution.post (
	"post_id" serial NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"image" varchar(50) NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"place_id" integer NOT NULL,
	"status" varchar(50) NOT NULL,
	"dt_creation" TIMESTAMP NOT NULL,
	CONSTRAINT "Post_pk" PRIMARY KEY ("post_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE resolution.votes (
	"like_id" serial NOT NULL,
	"post_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"is_like" BOOLEAN NOT NULL,
	CONSTRAINT "Votes_pk" PRIMARY KEY ("like_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE resolution.category (
	"category_id" integer NOT NULL,
	"category_name" varchar(50) NOT NULL,
	CONSTRAINT "Category_pk" PRIMARY KEY ("category_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE resolution.place (
	"place_id" serial NOT NULL,
	"place_name" varchar(50) NOT NULL,
	CONSTRAINT "Place_pk" PRIMARY KEY ("place_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE resolution.post ADD CONSTRAINT post_fk0 FOREIGN KEY ("user_id") REFERENCES resolution.user("user_id");
ALTER TABLE resolution.post ADD CONSTRAINT post_fk1 FOREIGN KEY ("category_id") REFERENCES resolution.category("category_id");
ALTER TABLE resolution.post ADD CONSTRAINT post_fk2 FOREIGN KEY ("place_id") REFERENCES resolution.place("place_id");

ALTER TABLE resolution.votes ADD CONSTRAINT "Votes_fk0" FOREIGN KEY ("post_id") REFERENCES resolution.post("post_id");
ALTER TABLE resolution.votes ADD CONSTRAINT "Votes_fk1" FOREIGN KEY ("user_id") REFERENCES resolution.user("user_id");

INSERT INTO resolution.category
(category_id, category_name)
VALUES(1, 'Infraestrutura');

INSERT INTO resolution.category
(category_id, category_name)
VALUES(2, 'Lixo');

INSERT INTO resolution.category
(category_id, category_name)
VALUES(3, 'Abuso');

INSERT INTO resolution.category
(category_id, category_name)
VALUES(4, 'Roubo de carro');

INSERT INTO resolution.place
(place_name)
VALUES('Instituto Central de Ciências');

INSERT INTO resolution.place
(place_name)
VALUES('Restaurante Universitário');

INSERT INTO resolution.place
(place_name)
VALUES('Faculdade de Tecnologia');

INSERT INTO resolution.place
(place_name)
VALUES('Faculdade do Gama');

INSERT INTO resolution.place
(place_name)
VALUES('Faculdade de Direito');

INSERT INTO resolution.place
(place_name)
VALUES('Instituo de Biologia');



INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(1, 'Bruno', 'Nunes', 'brunocmo', '123123', 'brunocmo@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(2, 'Tomas', 'Veloso', 'tomas', '123123', 'tomas@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(3, 'Vitor', 'Sulzbach', 'vitor', '123123', 'vitor@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(4, 'Guilherme', 'Aguiar', 'guilherme', '123123', 'gui@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(5, 'Mateus', 'Souza', 'mateus', '123123', 'mateus@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(6, 'Juliana', 'Valle', 'juliana', '123123', 'juh@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(7, 'Ariel', 'Vieira', 'sixwings', '123123', 'adriel@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(8, 'Gabriel', 'Filipe', 'gabriel', '123123', 'gabriel@gmail.com');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(9, 'Hércules', 'Ismael', 'hercules', '123123', 'hercules@gmail.com');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Ataque na rua', 'Dois caras tão se atacando aqui e tão inuriados no chão', 'imagem', 2, 3, 1, 'Não revisado', '2020-02-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Teto quebrado', 'O teto ta quebradão conserta isso ai parça', 'imagem', 1, 1, 1, 'Não revisado', '2020-10-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Janela Quebrada', 'A janela ta quebradona conserta isso ai parça', 'imagem', 4, 1, 1, 'Não revisado', '2020-02-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Lixo no chão', 'Tem lixo no chão desse local ai', 'imagem', 6, 2, 3, 'Não revisado', '2020-04-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Roubaram um carro', 'Roubaram um carro na minha frente, preciso de ajuda', 'imagem', 6, 4, 3, 'Não revisado', '2020-09-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Um problema ai', 'Teve um problema ai, help', 'imagem', 3, 4, 2, 'Não revisado', '2020-03-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Um problema novamente', 'Teve um problema ai novamente, help', 'imagem', 3, 2, 2, 'Não revisado', '2020-01-08');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('Um problema novamente denovo', 'Teve um problema ai novamente denovo, help', 'imagem', 1, 2, 2, 'Não revisado', '2020-08-08');
