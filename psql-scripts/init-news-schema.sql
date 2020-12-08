CREATE SCHEMA news;

CREATE TABLE news.news (
	"news_id" SERIAL NOT NULL,
	"title" varchar(25) NOT NULL,
	"subtitle" varchar(25) NOT NULL,
	"text" varchar(500) NOT NULL,
	"image1" varchar(50) NOT NULL,
	"image2" varchar(50) NOT NULL,
	"image3" varchar(50) NOT NULL,
	"post_id" varchar(25),
	CONSTRAINT "User_pk" PRIMARY KEY ("news_id")
);


INSERT INTO news.news (title,subtitle,text,image1,image2, image3,post_id)
    VALUES ('aosidj','subtitolo','text','120529.jpg','','','');
INSERT INTO news.news (title,subtitle,text,image1,image2, image3,post_id)
    VALUES ('asdasda','subtitolo','text','120529.jpg','k','','');
INSERT INTO news.news (title,subtitle,text,image1,image2, image3,post_id)
    VALUES ('aosidssdsdsdsdsdj','subtitolo','text','120529.jpg','','','');