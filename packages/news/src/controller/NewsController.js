const News = require("../models/news");

module.exports = {

  // Teste para criar um usuario
  async create(request, response) {
    const { title, subtitle, text, image1, image2, image3 } = request.body;

    const checkNewsExists = await News.findOne({
      where: { title },
    });

    if (checkNewsExists) {
      return response.status(400).json({ error: "Essa notícia já existe!" });
    }

    const news = await News.build({
      title, 
      subtitle, 
      text, 
      image1, 
      image2,
      image3
    });

    await news.save();

    return response.json(news);
  },
  async getAll(request, response){
    const allNews = await News.findAll();

    return response.json(allNews);
  },

  async getNewsById(request, response){
    const { news_id }= request.params;

    const news = await News.findOne({
      where: {
        news_id
      }
    });

    return response.json(news);
  },
  
  async putNewsById(request, response) {
    const { news_id } = request.params;
    const { title, subtitle, text, image1, image2, image3 } = request.body;

    const news = await News.update({
      news_id,
      title,
      subtitle,
      text, 
      image1,
      image2, 
      image3
    }, {
      where: {
        news_id
      }
    });

    return response.json(news);
  },

  async patchNewsById(request, response) {
    const { news_id } = request.params;

    const news = await News.update(request.body, {
      where: {
        news_id
      }
    });

    return response.json(news);
  },

  async deleteNewsById(request, response) {
    const { news_id } = request.params;

    const news = await News.destroy({
      where: {
        news_id
      }
    });

    return response.json(news);
  }
};
