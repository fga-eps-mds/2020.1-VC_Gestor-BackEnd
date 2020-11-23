const News = require("../models/news");

module.exports = {
  async UpdateNewsResolve(request) {

    var news = await News.findOne({ where: { news_id: request.params.news_id }});

    if(!news) { 
      throw { message: "News not found" };
    }

    await News.update(
      {
        title: request.body.title,
        subtitle: request.body.subtitle,
        text: request.body.text,
        image1: request.body.image1,
        image2: request.body.image2,
        image3: request.body.image3,
        post_id: request.body.post_id
      },
      {
        where: {
        news_id: request.params.news_id
      }
    });

    const updatedNews = await News.findOne({ where: { news_id: request.params.news_id }});

    return updatedNews;
  }
};