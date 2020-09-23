CREATE SCHEMA users;

CREATE TABLE users.user (
	"user_id" integer NOT NULL,
	"name" varchar(20) NOT NULL,
	"surname" varchar(20) NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar(20) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("user_id")
);