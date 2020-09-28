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

INSERT INTO resolution.place
(place_name)
VALUES('Minhocao');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(1, 'Bruno', 'Nunes', 'brunocmo', '123123', 'brunocmo@gmail.com');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('teste', 'testest', 'testes', 1, 1, 1, 'Não revisado', '2020-10-08');

INSERT INTO resolution.category
(category_id, category_name)
VALUES(2, 'Restaurante');

INSERT INTO resolution.place
(place_name)
VALUES('RU');

INSERT INTO resolution."user"
(user_id, "name", surname, username, "password", email)
VALUES(2, 'Tomas', 'Veloso', 'tomas', '123123', 'tomas@gmail.com');

INSERT INTO resolution.post
(title, description, image, user_id, category_id, place_id, status, dt_creation)
VALUES('teste2', 'testest', 'testes', 2, 2, 2, 'Não revisado', '2020-10-08');
