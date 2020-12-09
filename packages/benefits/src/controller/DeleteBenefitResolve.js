const Benefit = require("../models/benefit");

module.exports = {

  async DeleteBenefitResolve(request) {
    const { benefit_id } = request.params;

    const benefit = await Benefit.findOne({
      where: {
        benefit_id
      }
    });
    
    if (!benefit){
      throw { error: "Benefit not found!" };
    }

    await Benefit.destroy({
      where: {
        benefit_id
      }
    });

    return "O benefício foi deletado!";
  }
};