const Benefit = require("../models/benefit");

module.exports = {

  async DeleteBenefitResolve(request) {
    const { benefit_id } = request.params;

    await Benefit.destroy({
      where: {
        benefit_id
      }
    });

    return "O benefício foi deletado!";
  }
};