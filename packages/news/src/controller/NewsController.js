const News = require("../models/news");
const { CreateResolve } = require("./CreateResolve");
const { FindAllResolve } = require("./FindAllResolve");
const { FindByIdResolve } = require("./FindByIdResolve");
const { UpdateNewsResolve } = require("./UpdateNewsResolve");
const { DeleteNewsResolve } = require("./DeleteNewsResolve");

module.exports = {
  // Criação de uma notícia
  async create(request, response) {

    try {
      const news = await CreateResolve(request);

      return response.json(news);
    } catch(err) {
      return response.status(404).json(err);
    }
  
  },

  // Busca todas as notícias
  async getAllNews(request, response){
    try {
      const news = await FindAllResolve();

      response.send(news);
    } catch (err) {
      return response.status(404).json(err);
    }

  },
  // Busca uma notícia pelo Id dela
  async getNewsById(request, response){
    try {
      const news = await FindByIdResolve(request);

      return response.json(news);
  
    } catch(err) {
      return response.status(404).json(err);
    }

  },

  // Atualiza as notícias pelo Id de notícias
  async putNewsById(request, response) {

    try {
      const news = await UpdateNewsResolve(request);

      return response.json(news);
    } catch (err) {
      return response.status(404).json(err);
    }

  },

  // async patchNewsById(request, response) {
  //   const { news_id } = request.params;

  //   const news = await News.update(request.body, {
  //     where: {
  //       news_id
  //     }
  //   });

  //   return response.json(news);
  // },

  // Deleta as notícias
  async deleteNewsById(request, response) {

    try {
      const news = await DeleteNewsResolve(request);
    
      return response.json(news);
    } catch(err) {
      return response.status(404).json(err);
    }
  }
};
