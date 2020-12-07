const Benefit = require("../models/benefit");

module.exports = {

  async CreateBenefitResolve(request) {
    const { title, description, price, redeem_way, quantity } = request.body;

    if (title === "" || description === "" || redeem_way === "" || price === "" ||
        title === null || description === null || redeem_way === null ||
        price === null || quantity === null ) {
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