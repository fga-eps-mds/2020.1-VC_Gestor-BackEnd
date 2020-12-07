const Benefit = require("../models/benefit");

module.exports = {

  async UpdateBenefitResolve(request) {
    const { benefit_id } = request.params;
    const { title, description, price, redeem_way, quantity } = request.body;

    var benefit = await Benefit.findOne({ where: {benefit_id}});

    if (!benefit){
      throw { error: "Benefit not found!" };
    }

    if (title === "" || description === "" || redeem_way === "" ||
        title === null || description === null || redeem_way === null ||
        price === null || quantity === null ) {
      throw { error: "Fill request.body correctly, cannot be an empty string or null value "};
    }

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

    benefit = await Benefit.findOne({ where: {benefit_id}});

    return benefit;
  }
};