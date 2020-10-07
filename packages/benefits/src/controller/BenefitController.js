const Benefit = require("../models/benefit");
// const sequelize = require("sequelize");

module.exports = {

  async index(request, response) {
    const allBenefits = await Benefit.findAll();

    return response.json(allBenefits);
  },
  
  async createBenefit(request, response) {
    const { title, description, price, redeem_way, quantity } = request.body;

    const newBenefit = Benefit.build({
      title,
      description,
      price,
      redeem_way,
      quantity
    });

    await newBenefit.save();

    return response.json(newBenefit);
  },

  async deleteAllBenefits(request, response) {

    await Benefit.destroy({
      where: {}
    });

    return response.json("Todos os benefícios foram deletados!");
  },
  
  async getBenefitById(request, response) {
    const { benefit_id } = request.params;
    
    const benefit = await Benefit.findOne({
      where: {
        benefit_id
      }
    });

    return response.json(benefit);
  },
  
  async putBenefitById(request, response) {
    const { benefit_id } = request.params;
    const { title, description, price, redeem_way, quantity } = request.body;

    const benefit = await Benefit.update({
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

    return response.json(benefit);
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


  
  async deleteBenefitById(request, response) {
    const { benefit_id } = request.params;

    await Benefit.destroy({
      where: {
        benefit_id
      }
    });

    return response.json("Os benefício foi deletado!");
  },
};