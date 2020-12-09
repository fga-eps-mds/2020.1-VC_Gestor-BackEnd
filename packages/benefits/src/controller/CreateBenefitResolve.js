const Benefit = require("../models/benefit");

module.exports = {

  async CreateBenefitResolve(request) {
    const { title, description, redeem_way, quantity } = request.body;

    if (title === "" || description === "" || redeem_way === "" ) {
      throw { error: "Fill request.body correctly, cannot be an empty string or null value "};
    }

    const newBenefit = Benefit.create({
      title,
      description,
      redeem_way,
      quantity
    });

    return newBenefit;
  }
};