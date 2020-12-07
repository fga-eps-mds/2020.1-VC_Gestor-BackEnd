const News = require("../models/news");

module.exports = {
  async UpdateNewsResolve(request) {

    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;

    if ( title === "" || subtitle === "" || text === "" || 
        image1 === "" || image2 === "" || image3 === "" ||
        title === null || subtitle === null || text === null ||
        image1 === null || image2 === null || image3 === null || post_id === null
      ) {
        throw { error: "Fill request.body correctly, cannot be an empty string or null value "}
    }

    var news = await News.findOne({ where: { news_id: request.params.news_id }});

    if(!news) { 
      throw { message: "News not found" };
    }

    await News.update(
      {
        title, subtitle, text, image1, image2, image3, post_id
      },
      {
        where: {
        news_id: request.params.news_id
      }
    });

    const updatedNews = await News.findOne({ where: { news_id: request.params.news_id }});

    return updatedNews;
  }
};