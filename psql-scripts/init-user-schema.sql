CREATE SCHEMA users;

CREATE TABLE users.user (
	"userid" integer NOT NULL,
	"name" varchar(25) NOT NULL,
	"surname" varchar(25) NOT NULL,
	"username" varchar(25) NOT NULL,
	"password" varchar(64) NOT NULL,
	"coderetrieve" varchar(10) NOT NULL,
	"dateretrive" timestamp DEFAULT CURRENT_TIMESTAMP,
	"email" varchar(100) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("userid")
);

INSERT INTO users."user"
(userid, "name", surname, username, "password", coderetrieve, email)
VALUES(1, 'admin', 'admin', 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'aaaaaaaa', 'a@a.a');

INSERT INTO users."user"
(userid, "name", surname, username, "password", coderetrieve, email)
VALUES(2, 'admin2', 'admin2', 'admin2', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'aaaaaaaa', 'a@a.a');

INSERT INTO users."user"
(userid, "name", surname, username, "password", coderetrieve, email)
VALUES(3, 'Vitor', 'Sulzbach', 'Sulzbach', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'aaaaaaaa', 'vjsulzbach@gmail.com');

INSERT INTO users."user"
(userid, "name", surname, username, "password", coderetrieve, email)
VALUES(4, 'Guilherme', 'Aguiar', 'gui', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'aaaaaaaa', 'gui9627oli@gmail.com');

INSERT INTO users."user"
(userid, "name", surname, username, "password", coderetrieve, email)
VALUES(5, 'Mateus', 'Sousa', 'mateus', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'aaaaaaaa', 'mateusaugusto-2009@gmail.com');

