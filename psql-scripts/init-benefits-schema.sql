CREATE SCHEMA benefits;

CREATE TABLE benefits.benefits (
	"benefit_id" SERIAL NOT NULL ,
	"title" varchar(20) NOT NULL,
	"description" varchar(20) NOT NULL,
	"price" float NOT NULL,
	"redeem_way" varchar(20) NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "Benefits_pk" PRIMARY KEY ("benefit_id")
);

INSERT INTO benefits.benefits (description,title,price,redeem_way,quantity)
    VALUES ('Camisas','Uma descrição',20,'No DAF',18);
INSERT INTO benefits.benefits (description,title,price,redeem_way,quantity)
    VALUES ('Caneca','Uma descrição',20,'No DAF',98);
INSERT INTO benefits.benefits (description,title,price,redeem_way,quantity)
    VALUES ('Broche','Uma descrição',20,'No DAF',18);
