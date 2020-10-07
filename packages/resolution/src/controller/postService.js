const model = require("../models/post");
const db = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const findAndCountAll = (limit, page) => {

    const limitpages = limit;
    const offsetPerPage = limitpages * page;
    var post;
    post = model(sequelize, DataTypes);
    return post.findAndCountAll({
        attributes: {
        include: [
            [
            sequelize.literal(`
                (SELECT COUNT(*) 
                FROM resolution.votes 
                WHERE votes.post_id = post.post_id
                )
            `), "likes"
            ]
        ]
        },
        include: [ "user", "category", "place" ],
        limit: limitpages,
        offset: offsetPerPage,
        logging: false
        });
};

const getAllPosts = function(findAndCountAll) {
    return new Promise(function(resolve) {
        resolve(findAndCountAll);
        });
};

const findByPk = async function(postId) {

    return model(sequelize, DataTypes).findByPk(postId);
    
};

module.exports.getAllPosts = getAllPosts;
module.exports.findAndCountAll = findAndCountAll;
module.exports.findByPk = findByPk;
