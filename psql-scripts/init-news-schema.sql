CREATE SCHEMA news;

CREATE TABLE news.news (
	"news_id" SERIAL NOT NULL,
	"title" varchar(25) NOT NULL,
	"subtitle" varchar(25) NOT NULL,
	"text" varchar(500) NOT NULL,
	"image1" varchar(50) NOT NULL,
	"image2" varchar(50) NOT NULL,
	"image3" varchar(50) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("news_id")
);


INSERT INTO news.news (title,subtitle,text,image1,image2, image3)
    VALUES ('aosidj','subtitolo','text','alskdm','lzkdjlak','askjdak');
INSERT INTO news.news (title,subtitle,text,image1,image2, image3)
    VALUES ('asdasda','subtitolo','text','alskdm','lzkdjlak','askjdak');
INSERT INTO news.news (title,subtitle,text,image1,image2, image3)
    VALUES ('aosidssdsdsdsdsdj','subtitolo','text','alskdm','lzkdjlak','askjdak');