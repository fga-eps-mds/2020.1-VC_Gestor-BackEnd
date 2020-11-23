const express = require("express");

const BenefitController = require("../controller/BenefitController");

const benefitsRouter = express.Router();

benefitsRouter.get("/", BenefitController.index);
benefitsRouter.post("/", BenefitController.createBenefit);
//benefitsRouter.delete("/", BenefitController.deleteAllBenefits);

benefitsRouter.get("/:benefit_id", BenefitController.getBenefitById);
benefitsRouter.put("/:benefit_id", BenefitController.putBenefitById);
//benefitsRouter.patch("/:benefit_id", BenefitController.patchBenefitById);
benefitsRouter.delete("/:benefit_id", BenefitController.deleteBenefitById);

module.exports = benefitsRouter;
