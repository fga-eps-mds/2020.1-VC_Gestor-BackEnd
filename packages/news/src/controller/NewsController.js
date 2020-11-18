const News = require("../models/news");

module.exports = {
  // Criação de uma notícia
  create(request, response) {

    News.findOne({ where: { title: request.body.title }}).then( (news) => {
      if(news) { return response.status(404).send( {
        message: "News already with this title" });
      }

      const createdNews = News.build({
        title: request.body.title,
        subtitle: request.body.subtitle,
        text: request.body.text,
        image1: request.body.image1,
        image2: request.body.image2,
        image3: request.body.image3,
        post_id: request.body.post_id
      });

      createdNews.save().then( (newNews) => { return response.send(newNews); }
      ).catch((err) => {
        response.status(500).send({
          message: err.message || "Error at creation of news." });
      });
    }).catch((err) => { if(err.kind === "ObjectId") {
        return response.status(404).send({ message: "Title not found" });
      }
      return response.status(500).send({message: "Error retrieving news title"});
    });
  },
  // Busca todas as notícias
  getAllNews(req, res){
    News.findAll().then((news) => {
      if(!news) {
        return res.status(404).send({
          message: "No news found"
        });
      }
      res.send(news);
    }).catch((err) => {
      if(err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No news found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving news"
      });
    });
  },
  // Busca uma notícia pelo Id dela
  getNewsById(request, response){
    const { news_id } = request.params;
    News.findOne({ where: { news_id }})
    .then((news) => {
        if(!news) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.news_id
            });            
        }
        response.send(news);
    }).catch((err) => {
        if(err.kind === "ObjectId") {
            return response.status(404).send({
                message: "Note not found with id " + request.params.news_id
            });                
        }
        return response.status(500).send({
            message: "Error retrieving note with id " + request.params.news_id
        });
    });
  },
  // Atualiza as notícias pelo Id de notícias
  putNewsById(request, response) {

    News.findOne({ where: { news_id: request.params.news_id }})
    .then((news) => {
      if(!news) { return response.status(404).send({message: "News not found"});}

      news.update({
        news_id: request.params.news_id,
        title: request.body.title,
        subtitle: request.body.subtitle,
        text: request.body.text,
        image1: request.body.image1,
        image2: request.body.image2,
        image3: request.body.image3,
        post_id: request.body.post_id
      }, { where: { news_id: request.params.news_id } });
      response.send(news);
    })
    .catch((err) => {if(err.kind === "ObjectId") {
          return response.status(404).send({message: "News not found"});                
      }
      return response.status(500).send({message: "News not found"});
    });
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
  deleteNewsById(request, response) {

    News.findOne({ where: {news_id: request.params.news_id } })
    .then( (news) => {
      if(!news) {
        response.status(404).send({
          message: "News not found"
        });
      }

      news.destroy({ where: {news_id: request.params.news_id} }).then( (DeletedNews) => {
        return response.json(DeletedNews);
      });

    })
    .catch((err) => {
      if(err.kind === "ObjectId") {
          return response.status(404).send({
            message: "News not found"
          });                
      }
      return response.status(500).send({
        message: "News not found"
      });
    });
  }
};
