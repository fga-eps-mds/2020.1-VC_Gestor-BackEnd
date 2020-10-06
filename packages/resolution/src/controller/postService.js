const model = require("../models/post");
const db = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const findAll = () => {
    var post;
    post = model(sequelize, DataTypes);
    return post.findAll({
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
        logging: false
        });
};

const getAllPosts = function(findAll) {
    return new Promise(function(resolve) {
        resolve(findAll);
        });
}

const findByPk = async function(postId) {

    return model(sequelize, DataTypes).findByPk(postId);
    
}

module.exports.getAllPosts = getAllPosts;
module.exports.findAll = findAll;
module.exports.findByPk = findByPk;
