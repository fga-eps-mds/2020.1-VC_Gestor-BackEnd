const Benefit = require("../models/benefit");

module.exports = {

  async CreateBenefitResolve(request) {
    const { title, description, price, redeem_way, quantity } = request.body;

    if (title === "" || description === "" || redeem_way === "" || price === "" ) {
      throw { error: "Fill request.body correctly, cannot be an empty string or null value "};
    }

    const newBenefit = Benefit.create({
      title,
      description,
      price,
      redeem_way,
      quantity
    });

    return newBenefit;
  }
};