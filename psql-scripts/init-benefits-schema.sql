CREATE SCHEMA benefits;

CREATE TABLE benefits.benefits (
	"benefit_id" integer NOT NULL,
	"title" varchar(20) NOT NULL,
	"price" float NOT NULL,
	"redeem_way" varchar(20) NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "Benefits_pk" PRIMARY KEY ("benefit_id")
);