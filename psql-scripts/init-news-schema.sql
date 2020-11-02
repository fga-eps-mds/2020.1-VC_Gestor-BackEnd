CREATE SCHEMA news;

CREATE TABLE news.news (
	"news_id" SERIAL NOT NULL,
	"title" varchar(25) NOT NULL,
	"subtitle" varchar(25) NOT NULL,
	"text" varchar(500) NOT NULL,
	"image1" varchar(50) NOT NULL,
	"image2" varchar(50) NOT NULL,
	"image3" varchar(50) NOT NULL,
	"post_id" integer,
	CONSTRAINT "User_pk" PRIMARY KEY ("news_id")
);
