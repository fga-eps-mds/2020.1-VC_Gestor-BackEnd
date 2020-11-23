const News = require("../models/news");

module.exports = {
  async FindByIdResolve(request) {

    var news = await News.findOne({ where: { news_id: request.params.news_id }});

    if(!news) { 
      throw { message: "News id not found" };
    }

    return news;
  }
};