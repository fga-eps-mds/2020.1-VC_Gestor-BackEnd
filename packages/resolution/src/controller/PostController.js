const Post = require('../models/post');

module.exports = {

  // Listar todos os posts
  async index(request, response, next) {
      const posts = await Post.findAll();

      return response.json(posts);
  },

}