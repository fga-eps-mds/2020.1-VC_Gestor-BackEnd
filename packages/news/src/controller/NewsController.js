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
};
