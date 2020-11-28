const Post = require("../models/post");

const db = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const sequelize = new Sequelize(db);

function generateGraphs(dataset) {
  let today = new Date().getTime();
  let dayAgo = new Date((new Date().getTime()) - 24 * 60 * 60 * 1000);
  let countYear = [...Array(366).keys()].map((i) => { return [today-1000*60*60*24*Math.abs(i-365), 0]; });
  let countMonth = [...Array(31).keys()].map((i) => { return [today-1000*60*60*24*Math.abs(i-30), 0]; });
  let countWeek = [...Array(7).keys()].map((i) => { return [today-1000*60*60*24*Math.abs(i-6), 0]; });
  let countDay = [...Array(24).keys()].map((i) => { return [today-1000*60*60*Math.abs(i-23), 0]; });

  dataset.forEach((data) => { countYear[Math.abs(data.day - 365)][1]++;});

  dataset.filter((data) => { return data.day < 31; })
    .forEach((data) => { countMonth[Math.abs(data.day - 30)][1]++;});

  dataset.filter((data) => { return data.day < 7; })
    .forEach((data) => { countWeek[Math.abs(data.day - 6)][1]++; });

  dataset.filter((data) => { return data.date > dayAgo })
    .forEach((data) => { countDay[data.date.getHours()][1]++; });

  return { anual: countYear, mensal: countMonth, semanal: countWeek, diario: countDay };
}

const SequelizeSelect = {
  attributes: {
    include: [[
      sequelize.literal(`
    (SELECT COUNT(*) FROM resolution.votes WHERE votes.post_id = post.post_id)
    `), "likes"
    ]]
  },
  include: ["user", "category", "place"]
};

module.exports = {

  // Listar todos os posts
  index(request, response) {
    const { limit, page } = request.query;
    var limitpages = limit;
    var offsetPerPage = page * limit;
    Post.findAndCountAll(
      {
        attributes: {
          include: [[
            sequelize.literal(`
          (SELECT COUNT(*) FROM resolution.votes WHERE votes.post_id = post.post_id)
          `), "likes"
          ]]
        },
        include: ["user", "category", "place"],
        limit: limitpages, offset: offsetPerPage, logging: false
      }
    ).then((post) => {
      if (!post) { return response.status(404).send({ message: "No post found" }); }
      response.send(post);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({ message: "No post found" });
      }
      return response.status(500).send({ message: "Error retrieving post" });
    });
  },

  // Mostrar um post por ID
  postById(request, response) {
    const { post_id } = request.params;
    Post.findByPk(post_id, SequelizeSelect)
      .then((post) => {
        if (!post) {
          return response.status(404).send({ message: "Post not found with id " });
        }
        response.send(post);
      }).catch((err) => {
        if (err.kind === "ObjectId") {
          return response.status(404).send({ message: "Post not found with id " });
        }
        return response.status(500).send({ message: "Error post not found with id " });
      });
  },

  // Submeter uma mudança de estado
  statusChange(request, response) {
    const { post_id } = request.params;
    const { status } = request.body;
    const postStatus = status;

    Post.findByPk(post_id, SequelizeSelect)
      .then((post) => {
        if (!post) {
          return response.status(404).send({ message: "Post not found with id " });
        }

        if (!postStatus) { return response.status(400).send({ message: "Status not requested" }); }

        if (post.status === postStatus) { return response.status(400).send({ message: "Status is already the same" }); }

        post.update({ status: postStatus });

        response.send(post);
      }).catch((err) => {
        if (err.kind === "ObjectId") {
          return response.status(404).send({ message: "Post not found with id " });
        }
        return response.status(500).send({ message: "Error post not found with id " });
      });
  },

  graphPosts(request, response) {
    let today = new Date();
    let yearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
    Post.findAll({
      where: {
        "dt_creation": {
          [Op.gt]: yearAgo
        }
      }
    }).then((posts) => {

      let treatedDays = posts.map((post) => {
        return {
          date: post.dt_creation,
          day: ~~((Math.abs(post.dt_creation.getTime() - (new Date().getTime()))) / (1000 * 60 * 60 * 24)),
          status: post.status
        };
      });

      return response.status(200).send({ message: "", data: generateGraphs(treatedDays) });
    }).catch((error) => {
      return response.status(500).send({ message: error });
    })
  },

  graphStatusPosts(request, response) {
    let today = new Date();
    let yearAgo = new Date(today.setFullYear(today.getFullYear() - 1))
    Post.findAll({
      where: {
        "dt_creation": {
          [Op.gt]: yearAgo
        }
      }
    }).then((posts) => {
      //Aguardando Resolvido Em andamento Arquivados
      let treatedDays = posts.map((post) => {
        return {
          date: post.dt_creation,
          day: ~~((Math.abs(post.dt_creation.getTime() - (new Date().getTime()))) / (1000 * 60 * 60 * 24)),
          status: post.status
        }
      })

      let andamento = treatedDays.filter((post) => { return post.status === "Em andamento"; })
      let aguardando = treatedDays.filter((post) => { return post.status === "Aguardando"; })
      let arquivados = treatedDays.filter((post) => { return post.status === "Arquivados"; })
      let resolvido = treatedDays.filter((post) => { return post.status === "Resolvido"; })

      return response.status(200).send({
        message: "",
        andamento: generateGraphs(andamento),
        aguardando: generateGraphs(aguardando),
        arquivados: generateGraphs(arquivados),
        resolvido: generateGraphs(resolvido)
      });
    }).catch((error) => {
      return response.status(500).send({ message: error });
    })
  }

};