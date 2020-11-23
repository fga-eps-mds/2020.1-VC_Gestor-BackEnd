const Benefit = require("../models/benefit");

module.exports = {

  async UpdateBenefitResolve(request) {
    const { benefit_id } = request.params;
    const { title, description, price, redeem_way, quantity } = request.body;

    await Benefit.update({
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

    const benefit = await Benefit.findOne({ where: {benefit_id}});

    return benefit;
  }
}