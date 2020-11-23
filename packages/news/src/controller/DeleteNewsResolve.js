const News = require("../models/news");

module.exports = {
  async DeleteNewsResolve(request) {

    const { news_id } = request.params;

    const news = await News.findOne({ where: { news_id }});

    if(!news) { 
      throw { message: "News id not found" };
    }

    const deleteNews = await News.destroy({ where: { news_id } });

    return deleteNews;
  }
};