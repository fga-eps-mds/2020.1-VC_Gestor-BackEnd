const News = require("../models/news");

module.exports = {
  async CreateResolve(request) {

    var news = await News.findOne({ where: { title: request.body.title }});

    if(news) { 
      throw { message: "News already with this title" };
    }

    news = await News.build({
      title: request.body.title,
      subtitle: request.body.subtitle,
      text: request.body.text,
      image1: request.body.image1,
      image2: request.body.image2,
      image3: request.body.image3,
      post_id: request.body.post_id
    });

    await news.save();

    return news;
  }
};