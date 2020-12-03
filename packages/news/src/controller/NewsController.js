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
      const createdNews = await CreateResolve(request);

      return response.json(createdNews);
    } catch(errCreate) {
      return response.status(404).json(errCreate);
    }
  
  },

  // Busca todas as notícias
  async getAllNews(request, response){

    const allNews = await FindAllResolve();

    response.send(allNews);
  },
  
  // Busca uma notícia pelo Id dela
  async getNewsById(request, response){
    try {
      const getOneNews = await FindByIdResolve(request);

      return response.json(getOneNews);
  
    } catch(errOne) {
      return response.status(404).json(errOne);
    }

  },

  // Atualiza as notícias pelo Id de notícias
  async putNewsById(request, response) {

    try {
      const updateNews = await UpdateNewsResolve(request);

      return response.json(updateNews);
    } catch (errUpdate) {
      return response.status(404).json(errUpdate);
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
      const deletedNews = await DeleteNewsResolve(request);
    
      return response.json(deletedNews);
    } catch(errDelete) {
      return response.status(404).json(errDelete);
    }
  }
};
