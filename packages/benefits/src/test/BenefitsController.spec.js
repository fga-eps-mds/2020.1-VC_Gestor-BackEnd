const sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");

const { CreateBenefitResolve } = require("../controller/CreateBenefitResolve");
const { FindAllBenefitsResolve } = require("../controller/FindAllBenefitsResolve");
const { FindByIdBenefitResolve } = require("../controller/FindByIdBenefitResolve");
const { UpdateBenefitResolve } = require("../controller/UpdateBenefitResolve");
const { DeleteBenefitResolve } = require("../controller/DeleteBenefitResolve");

const Benefit = require("../models/benefit");

chai.use(chaiaspromise);

describe("Controllers",function() {
  
  describe("Benefits", function() {
    it("Should create a benefit", async function() {
      
      const request = {
        body: {
          title: "TesteCreate",
          description: "TesteDescriptionCreate",
          redeem_way: "testeRedeemCreate",
          quantity: "testeQuantityCreate",
        }
      };
      
      var benefitCreate = {
        title: "TesteCreate",
        description: "TesteDescriptionCreate",
        redeem_way: "testeRedeemCreate",
        quantity: "testeQuantityCreate",
      };
      
      var stubCreate = sinon.stub(Benefit, "create");
      stubCreate.withArgs({
        title: request.body.title,
        description: request.body.description,
        redeem_way: request.body.redeem_way,
        quantity: request.body.quantity,
      }).returns(benefitCreate);
      
      const benefitTest = await CreateBenefitResolve(request);
      
      expect(benefitTest).to.be.equal(benefitCreate);
      
      stubCreate.restore();
      
    });
    
    it("Should find all benefits", async function() {
      
      var benefitsFake = [
        {
          benefit_id: 2,
          title: "Teste1",
          description: "TesteDescription1",
          redeem_way: "testeRedeem1",
          quantity: "testeQuantity1",
        },
        {
          benefit_id: 7,
          title: "Teste2",
          description: "TesteDescription2",
          redeem_way: "testeRedeem2",
          quantity: "testeQuantity2",
        },
      ];
      
      var stub = sinon.stub(Benefit, "findAll");
      stub.returns(benefitsFake);   
      
      const benefits = await FindAllBenefitsResolve();
      
      expect(benefits).to.be.equal(benefitsFake);
      
      stub.restore();
      
    });
    
    it("Should find benefit by id", async function() {
      var request = {
        params: {
          benefit_id: 7
        }
      };
      
      var benefitFake = {     
        benefit_id: 2,
        title: "Teste1",
        description: "TesteDescription1",
        redeem_way: "testeRedeem1",
        quantity: "testeQuantity1", 
      };
      
      var stub = sinon.stub(Benefit, "findOne");
      stub.withArgs({ where: { benefit_id: request.params.benefit_id }} ).returns(benefitFake);      
      
      const benefit = await FindByIdBenefitResolve(request) ;
      
      expect(benefit).to.be.equal(benefitFake);
      
      stub.restore();
    });
    
    it("Should update benefit by id", async function() {
      
      const request = {
        params: {
          benefit_id: 7
        },
        body: {
          title: "TesteUpdate",
          description: "TesteDescriptionUpdate",
          redeem_way: "testeRedeemUpdate",
          quantity: "testeQuantityUpdate", 
        }
      };
      
      var benefitFake = {     
        benefit_id: 7,
        title: "Teste1",
        description: "TesteDescription1",
        redeem_way: "testeRedeem1",
        quantity: "testeQuantity1", 
      };
      
      var benefitUpdate = {     
        title: "TesteUpdate",
        description: "TesteDescriptionUpdate",
        redeem_way: "testeRedeemUpdate",
        quantity: "testeQuantityUpdate", 
      };
      
      var stubFindOne = sinon.stub(Benefit, "findOne");
      stubFindOne.withArgs({ where: { benefit_id: request.params.benefit_id }})
      .returns(benefitUpdate);

      
      var stubUpdate = sinon.stub(Benefit, "update");
      stubUpdate.withArgs({
        title: request.body.title,
        description: request.body.description,
        redeem_way: request.body.redeem_way,
        quantity: request.body.quantity,
      }).returns(benefitFake);
      
      const benefitTest = await UpdateBenefitResolve(request);
      
      expect(benefitTest).to.be.equal(benefitUpdate);
      
      stubFindOne.restore();
      stubUpdate.restore();
    });
    
    it("Should delete benefit by id", async function() {
      var request = {
        params: {
          benefit_id: 7
        }
      };
      
      const benefit_id = request.params.benefit_id;
      
      const stubDelete = sinon.stub(Benefit, "destroy");
      stubDelete.withArgs({ where: { benefit_id }}).returns(1);
      
      const deteledNews = await DeleteBenefitResolve(request);
      
      expect(deteledNews).to.be.equal("O benefício foi deletado!");
      
      stubDelete.restore();
      
    });
    
  });
});