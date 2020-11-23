const Benefit = require("../models/benefit");

module.exports = {
  async FindAllBenefitsResolve() {
     const allBenefits = await Benefit.findAll();

    return allBenefits;
  }
}