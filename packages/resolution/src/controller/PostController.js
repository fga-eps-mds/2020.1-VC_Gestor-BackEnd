const model = require("../models/post");
const postService = require("../controller/postService");
const db = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {

  // Listar todos os posts
  index(request, response) {
    const { limit, page } = request.query;
    postService.getAllPosts(postService.findAndCountAll(limit, page)).then(function(posts) {
      return response.json(posts);
    });
  },

  // Submeter uma mudança de estado
  async statusChange(request, response) {

    const { post_id } = request.params;
    const { state } = request.body;

    let post;

    if("stubPost" in request) {
      post = request.stubPost;
    } else {
      post = await postService.findByPk(post_id);
    }
    
    if (!state) {
      return response.status(400).json({ error: "Status not requested"});
    }
    
    if (!post) {
      return response.status(400).json({ error: "Post not found"});
    }

    if ( post.status === state) {
      return response.status(400).json({ error: "Status is already the same"});
    }

    await post.update({ status: state });

    return response.json(post);
  },
};
