const News = require("../models/news");

module.exports = {
  async FindAllResolve() {

    const news = await News.findAll();

    return news;
  }
};