const model = require("../models/post");
const postService = require("../controller/postService");
const db = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

module.exports = {
  
  // Listar todos os posts
  index(request, response){
    const { limit, page } = request.query;
    var limitpages = limit;
    var offsetPerPage = page*limit;
    model.findAndCountAll(
      {
        attributes: { include: [[
          sequelize.literal(`
          (SELECT COUNT(*) FROM resolution.votes WHERE votes.post_id = post.post_id)
          `), "likes"
        ]]},
        include: [ "user", "category", "place" ],
        limit: limitpages, offset: offsetPerPage, logging: false
      }
      ).then((post) => {
        if(!post) { return response.status(404).send({message: "No post found"});}
        response.send(post);
      }).catch((err) => { if(err.kind === "ObjectId") {
        return response.status(404).send({message: "No post found"});
      }
      return response.status(500).send({message: "Error retrieving post"});
    })
  },
  
  // Mostrar um post por ID
  postById(request, response){
    const { post_id } = request.params;
    model.findByPk(post_id, {
      attributes: { include: [[
        sequelize.literal(`
        (SELECT COUNT(*) FROM resolution.votes WHERE votes.post_id = post.post_id)
        `), "likes"
      ]]},
      include: [ "user", "category", "place" ]
    })
    .then((post) => { if(!post) {
      return response.status(404).send({message: "Post not found with id "});            
    }
    response.send(post);
    }).catch((err) => {
      if(err.kind === "ObjectId") {
        return response.status(404).send({message: "Post not found with id "});                
      }
      return response.status(500).send({message: "Error post not found with id "});
    });
},

// Submeter uma mudança de estado
statusChange(request, response) {
  const { post_id } = request.params;
  const { status } = request.body;
  const postStatus = status;
  
  model.findByPk(post_id, {
    attributes: { include: [[
      sequelize.literal(`
      (SELECT COUNT(*) FROM resolution.votes WHERE votes.post_id = post.post_id)
      `), "likes"
    ]]}, include: [ "user", "category", "place" ]
  })
  .then((post) => { if(!post) {
    return response.status(404).send({message: "Post not found with id "});            
  }
  
  if (!postStatus) {return response.status(400).send({message: "Status not requested"});}
  
  if (post.status === postStatus) {return response.status(400).send({message: "Status is already the same"});}
  
  post.update({ status: postStatus });
  
  response.send(post);
  }).catch((err) => {
    if(err.kind === "ObjectId") {
      return response.status(404).send({message: "Post not found with id "});                
    }
    return response.status(500).send({ message: "Error post not found with id "});
  });
},
};
