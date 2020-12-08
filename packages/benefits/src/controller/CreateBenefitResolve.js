const Benefit = require("../models/benefit");

module.exports = {

  async CreateBenefitResolve(request) {
    const { title, description, redeem_way, quantity } = request.body;

    const newBenefit = Benefit.create({
      title,
      description,
      redeem_way,
      quantity
    });

    return newBenefit;
  }
};