const News = require("../models/news");

module.exports = {
  async FindAllResolve() {

    const news = await News.findAll();

    if(!news) {
      throw { message: "No news found" };
    }

    return news;
  }
};