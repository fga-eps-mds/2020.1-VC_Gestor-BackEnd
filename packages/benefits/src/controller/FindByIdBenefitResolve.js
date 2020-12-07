const Benefit = require("../models/benefit");

module.exports = {

  async FindByIdBenefitResolve(request) {
    const { benefit_id } = request.params;
    
    const benefit = await Benefit.findOne({
      where: {
        benefit_id
      }
    });
    
    if (!benefit){
      throw { error: "Benefit not found!" };
    }

    return benefit;
  }
};