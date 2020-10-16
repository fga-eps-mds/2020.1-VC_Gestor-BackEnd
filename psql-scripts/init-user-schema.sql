CREATE SCHEMA users;

CREATE TABLE users.user (
	"user_id" integer NOT NULL,
	"name" varchar(25) NOT NULL,
	"surname" varchar(25) NOT NULL,
	"username" varchar(25) NOT NULL,
	"password" varchar(25) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("user_id")
);

INSERT INTO users."user"
(user_id, "name", surname, username, "password")
VALUES(1, 'teste', 'teste', 'teste', '123123');

INSERT INTO users."user"
(user_id, "name", surname, username, "password")
VALUES(2, 'teste2', 'teste2', 'teste2', '123123');
