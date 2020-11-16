const Benefit = require("../models/benefit");
// const sequelize = require("sequelize");

module.exports = {

  index(request, response){
    Benefit.findAll().then((benefit) => {
      if(!benefit) {
        return response.status(404).send({
          message: "No benefit found"
        });
      }
      response.send(benefit);
    }).catch((err) => {
      if(err.kind === "ObjectId") {
        return response.status(404).send({
          message: "No benefit found"
        })
      }
      return response.status(500).send({
        message: "Error retrieving benefit"
      });
    })
  },
  
  createBenefit(request, response) {
    const { title, description, price, redeem_way, quantity } = request.body;
    var newBenefit;

    Benefit.findOne({ where: { title }})
    .then( (benefit) => {
      if(benefit) {
        return response.stats(404).send({
          message: "Benefit already with this title"
        });
      }

      newBenefit = Benefit.build({
        title,
        description,
        price,
        redeem_way,
        quantity
      });
      newBenefit.save()
      .then( (createdBenefit) => {
        return response.send(createdBenefit);
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message || "Error at creation of benefit."
        });
      });
    })
    .catch((err) => {
      if(err.kind === "ObjectId") {
        return response.status(404).send({
          message: "Title not found"
        });
      }
      return response.status(500).send({
        message: "Error retrieving benefit title"
      });
    });
  },

  async deleteAllBenefits(request, response) {

    await Benefit.destroy({
      where: {}
    });

    return response.json("Todos os benefícios foram deletados!");
  },

  getBenefitById(request, response){
    const { benefit_id } = request.params;
    Benefit.findOne({ where: { benefit_id }})
    .then((benefit) => {
        if(!benefit) {
            return response.status(404).send({
                message: "Benefit not found with id "
            });            
        }
        response.send(benefit);
    }).catch((err) => {
        if(err.kind === "ObjectId") {
            return response.status(404).send({
                message: "Benefit not found with id "
            });                
        }
        return response.status(500).send({
            message: "Error benefit not found with id "
        });
    });
  },

  async patchBenefitById(request, response) {
    const { benefit_id } = request.params;

    const benefit = await Benefit.update(request.body, {
      where: {
        benefit_id
      }
    });

    return response.json(benefit);
  },

  putBenefitById(request, response) {
    const { benefit_id } = request.params;
    const { title, description, price, redeem_way, quantity } = request.body;

    Benefit.findOne({ where: { benefit_id }})
    .then((benefit) => {
      if(!benefit) {
        return response.status(404).send({
          message: "Benefit not found"
        });
      }

      benefit.update({
        benefit_id,
        title,
        description,
        price,
        redeem_way,
        quantity
      }, {
        where: {
          benefit_id
        }
      });

      response.send(benefit);
    })
    .catch((err) => {
      if(err.kind === "ObjectId") {
          return response.status(404).send({
            message: "Benefit not found"
          });                
      }
      return response.status(500).send({
        message: "Benefit not found"
      });
    });
  },

  deleteBenefitById(request, response) {
    const { benefit_id } = request.params;

    Benefit.findOne({ where: {benefit_id} })
    .then( (benefit) => {
      if(!benefit) {
        response.status(404).send({
          message: "Benefit not found"
        });
      }

      benefit.destroy({ where: {benefit_id} });
      return response.json({message: "Benefit deleted"});
    })
    .catch((err) => {
      if(err.kind === "ObjectId") {
          return response.status(404).send({
            message: "Benefit not found"
          });                
      }
      return response.status(500).send({
        message: "Benefit not found at database"
      });
    });
  }
};