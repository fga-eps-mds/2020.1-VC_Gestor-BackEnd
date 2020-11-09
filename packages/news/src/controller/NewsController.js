const model = require("../models/news");
const newsService = require("../controller/newsService");

module.exports = {

  async create(request, response) {
    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;
    var checkNewsExists;

    if("stubPost" in request) {
      if(request.stubPost.title === title) checkNewsExists = true;
      else checkNewsExists = false;
    } else {
      checkNewsExists = await newsService.findOneWithTitle(title);
    }
    
    if (checkNewsExists) {
      return response.status(400).json({ error: "Essa notícia já existe!" });
    }

    const news = await newsService.createNews(title, subtitle, text, image1, image2, image3, post_id);

    await news.save();

    return response.json(news);
  },

  async getAll(request, response){
    newsService.getAllNews(newsService.findAll()).then(function(news) {
      return response.json(news);
    });
  },

  async getNewsById(request, response){
    const { news_id }= request.params;
    var news;

    if("stubPost" in request) {
      if(request.stubPost.news_id === news_id) news = request.stubPost;
      else news = false;
    } else {
      news = await newsService.findOneWithNewsId(news_id);
    }
    
    if (!news) {
      return response.status(400).json({error: "News not found"});
    }

    return response.json(news);
  },
  
  async putNewsById(request, response) {
    const { news_id } = request.params;
    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;
    var news;
    var updatedNews;
    if("stubPost" in request) {
      if(request.stubPost.news_id === news_id) news = request.stubPost;
      else news = false;
    } else {
      news = await newsService.findOneWithNewsId(news_id);
    }
    
    if (!news) {
      return response.status(400).json({error: "News not found"});
    }

    await news.update({
        news_id,
        title,
        subtitle,
        text, 
        image1,
        image2, 
        image3,
        post_id
      }, {
        where: {
          news_id
        }
      }
    );

    return response.json(news);
  },

  async patchNewsById(request, response) {
    const { news_id } = request.params;

    const news = await model.update(request.body, {
      where: {
        news_id
      }
    });

    return response.json(news);
  },

  async deleteNewsById(request, response) {
    const { news_id } = request.params;
    var news;
    if("stubPost" in request) {
      if(request.stubPost.news_id === news_id) news = request.stubPost;
      else news = false;
    } else {
      news = await newsService.findOneWithNewsId(news_id);
    }
    
    if (!news) {
      return response.status(400).json({error: "News not found"});
    }

    await news.destroy({
      where: { news_id },
    });;

    return response.json({message: "News deleted"});
  }
};
