const model = require("../models/news");
const db = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const findOneWithTitle = (title) => {
    var news;
    news = model(sequelize, DataTypes);
    return news.findOne({
      where: { title },
    });
};

const findOneWithNewsId = (news_id) => {
  var news;
  news = model(sequelize, DataTypes);
  return news.findOne({
    where: { news_id },
  });
};

const createNews = (title, subtitle, text, image1, image2, image3, post_id) => {
  var news;
  news = model(sequelize, DataTypes);
  return news.build({
    title, 
    subtitle, 
    text, 
    image1, 
    image2,
    image3,
    post_id
  });
};

const findAll = () => {
  var news;
  news = model(sequelize, DataTypes);
  return news.findAll();
};

const getAllNews = function(findAll) {
  return new Promise(function(resolve) {
    resolve(findAll);
  });
};

module.exports.findOneWithTitle = findOneWithTitle;
module.exports.findOneWithNewsId = findOneWithNewsId;
module.exports.findAll = findAll;
module.exports.createNews = createNews;
module.exports.getAllNews = getAllNews;

