const Post = require("../models/post");
const sequelize = require("sequelize");
const postService = require("../controller/postService")

module.exports = {

  // Listar todos os posts
  index(request, response) {
    postService.getAllPosts(postService.findAll()).then(function(posts) {
      return response.json(posts);
    })
  },

  // Submeter uma mudança de estado
  async statusChange(request, response) {
    const { post_id } = request.params;
    const { state } = request.body;

    const post = await Post.findByPk(post_id);

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
