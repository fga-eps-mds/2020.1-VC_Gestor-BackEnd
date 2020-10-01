const Post = require('../models/post');
const sequelize = require('sequelize');

module.exports = {

  // Listar todos os posts
  async index(request, response) {
    //Place.hasOne(Post);
    
      const posts = await Post.findAll({
        attributes: {
          include: [
            [
              sequelize.literal(`
                (SELECT COUNT(*) 
                FROM resolution.votes 
                WHERE votes.post_id = post.post_id
                )
              `), 'likes'
            ]
          ]
        },
        include: [ 'user', 'category', 'place' ],
        order: ['status']
       });

      return response.json(posts);
  },

  // Submeter uma mudança de estado
  async statusChange(request, response) {
    const { post_id } = request.params;
    const { state } = request.body;

    const post = await Post.findByPk(post_id);

    if (!post) {
      return response.status(400).json({ error: 'Post not found'});
    }

    if ( post.status == state) {
      return response.status(400).json({ error: 'Status is already the same'});
    }

    await post.update({ status: state });

    return response.json(post);
  },


}