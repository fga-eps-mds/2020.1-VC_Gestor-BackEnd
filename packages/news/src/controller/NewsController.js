const News = require("../models/news");

module.exports = {
  // Criação de uma notícia
  create(request, response) {
    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;
    var createdNews;

    News.findOne({ where: { title }})
    .then( news => {
      if(news) {
        return response.status(404).send({
          message: "News already with this title"
        });
      }

      createdNews = News.build({
        title,
        subtitle,
        text,
        image1,
        image2,
        image3,
        post_id
      });

      createdNews.save()
      .then( newNews => {
        return response.send(newNews);
      })
      .catch(err => {
        response.status(500).send({
          message: err.message || "Error at creation of news."
        })
      });
    })
    .catch(err => {
      if(err.kind === "ObjectId") {
        return response.status(404).send({
          message: "Title not found"
        })
      }
      return response.status(500).send({
        message: "Error retrieving news title"
      });
    });
  },
  // Busca todas as notícias
  getAllNews(req, res){
    News.findAll().then(news => {
      if(!news) {
        return res.status(404).send({
          message: "No news found"
        });
      }
      res.send(news);
    }).catch(err => {
      if(err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No news found"
        })
      }
      return res.status(500).send({
        message: "Error retrieving news"
      });
    })
  },
  // Busca uma notícia pelo Id dela
  getNewsById(req, res){
    noticia = req.params.news_id;
    News.findOne({ where: { news_id: noticia }})
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.news_id
            });            
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.news_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.news_id
        });
    });
  },
  // Atualiza as notícias pelo Id de notícias
  putNewsById(request, response) {
    const { news_id } = request.params;
    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;

    News.findOne({ where: { news_id }})
    .then(news => {
      if(!news) {
        return response.status(404).send({
          message: "News not found"
        });
      }

      news.update({
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
      });
      response.send(news);
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "News not found"
          });                
      }
      return res.status(500).send({
        message: "News not found"
      });
    });
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
  // Deleta as notícias
  deleteNewsById(request, response) {
    const { news_id } = request.params;

    News.findOne({ where: {news_id} })
    .then( news => {
      if(!news) {
        response.status(404).send({
          message: "News not found"
        });
      }

      news.destroy({ where: {news_id} });
      return response.json({message: "News deleted"});
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
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
