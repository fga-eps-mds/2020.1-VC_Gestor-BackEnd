const Benefit = require("../models/benefit");
const { CreateBenefitResolve } = require("./CreateBenefitResolve");
const { FindAllBenefitsResolve } = require("./FindAllBenefitsResolve");
const { FindByIdBenefitResolve } = require("./FindByIdBenefitResolve");
const { UpdateBenefitResolve } = require("./UpdateBenefitResolve");
const { DeleteBenefitResolve } = require("./DeleteBenefitResolve");

module.exports = {

  async index(request, response) {
    const benefit = await FindAllBenefitsResolve();

    return response.json(benefit);
  },
  
  // Criação de benefício
  async createBenefit(request, response) {

    try {
      const benefit = await CreateBenefitResolve(request);

      return response.json(benefit);
    } catch (err) {
      return response.status(404).json(err);
    }

  },

  // !!! Não sendo usado !!! 
  // async deleteAllBenefits(request, response) {

  //   await Benefit.destroy({
  //     where: {}
  //   });

  //   return response.json("Todos os benefícios foram deletados!");
  // },
  
  async getBenefitById(request, response) {

    
    try {
      const benefit = await FindByIdBenefitResolve(request);

      return response.json(benefit);
    } catch (err) {
      return response.status(404).json(err);
    }

  },
  
  async putBenefitById(request, response) {
    try {
      const benefit = await UpdateBenefitResolve(request);

      return response.json(benefit);
    } catch (err) {
      return response.status(404).json(err);
    }
  },

  // !!! Não sendo usado !!!
  // async patchBenefitById(request, response) {
  //   const { benefit_id } = request.params;

  //   const benefit = await Benefit.update(request.body, {
  //     where: {
  //       benefit_id
  //     }
  //   });

  //   return response.json(benefit);
  // },

  async deleteBenefitById(request, response) {
    try {
      const benefit = await DeleteBenefitResolve(request);

      return response.json(benefit);
    } catch (err) {
      return response.status(404).json(err);
    } 

  },
};
