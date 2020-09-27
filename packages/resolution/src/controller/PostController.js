// const Post = require('../models/Post');

module.exports = {

  // Listar todos os posts
  // async index(request, response) {
  //   const posts = await Post.findAll();

  //   return response.json(users);
  // },

  // Submeter a mudança de estado
  async statusChange(request, response) {

    return response.json({ message: "wow"});    

  },


  // Teste de get
  async testHello(request, response) {
    response.json(
      { message: 'posts page' });
  }
}