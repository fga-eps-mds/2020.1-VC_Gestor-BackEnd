const News = require("../models/news");

module.exports = {
  async UpdateNewsResolve(request) {

    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;

    var news = await News.findOne({ where: { news_id: request.params.news_id }});

    if(!news) { 
      throw { message: "News not found" };
    }

    await News.update(
      {
        title,
        subtitle,
        text,
        image1,
        image2,
        image3,
        post_id
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