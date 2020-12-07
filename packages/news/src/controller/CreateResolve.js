const News = require("../models/news");

module.exports = {
  async CreateResolve(request) {

    const { title, subtitle, text, image1, image2, image3, post_id } = request.body;

    if ( title === "" || subtitle === "" || text === "" || post_id === "" ||
         title === null || subtitle === null || text === null ||
        image1 === null || image2 === null || image3 === null || post_id === null
      ) {
        throw { error: "Fill request.body correctly, cannot be an empty string or null value "}
    }

    var news = await News.findOne({ where: {title} });

    if(news) { 
      throw { error: "News already with this title" };
    }

    news = await News.create({
      title,
      subtitle,
      text,
      image1,
      image2,
      image3,
      post_id
    });

    return news;
  }
};