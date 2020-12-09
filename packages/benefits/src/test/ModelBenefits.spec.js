var controller = require("../controller/BenefitController");
var should = require("chai").should();
var expect = require("chai").expect;
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
const proxyquire = require("proxyquire");

chai.use(require("sinon-chai"));
chai.use(chaiAsPromised);
chai.should();

const {
    checkPropertyExists,
  } = require("sequelize-test-helpers");

const BenefitsModel = require("../models/benefit");

describe("Model", function() {
    describe("Benefits Instance Testing", function() {
        const instance = new BenefitsModel;

        context("Benefits Properties", () => {
            ["benefit_id", "title", "description", 
            "redeem_way", "quantity"]
            .forEach(checkPropertyExists(instance));
          }
        );
    });
});
