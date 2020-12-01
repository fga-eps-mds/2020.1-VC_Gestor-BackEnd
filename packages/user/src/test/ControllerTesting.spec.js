const sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");

const { AuthenticateUserService } = require("../controller/AuthenticateUserService");
const { ChangePasswordResolve } = require("../controller/ChangePasswordResolve");
const { CheckCodeResolve } = require("../controller/CheckCodeResolve");
const { EditUserResolve } = require("../controller/EditUserResolve");
const { GetUserByTokenResolve } = require("../controller/GetUserByTokenResolve");
const { SendEmailResolve } = require("../controller/SendEmailResolve");


const User = require("../models/user");
const jwt = require("jsonwebtoken");

chai.use(chaiaspromise);

describe("Controllers",function() {

  describe("User", function() {
    it("Should get an user by token", async function() {

      const request = {
        body: {
          token: "umToken"
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        iat: 1606760780
      }

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: "test@test.com"
      }

      var stubVerify = sinon.stub(jwt, "verify");
      stubVerify.returns(user);

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.withArgs({ where: { username : user.username }})
      .returns(userDB);

      const userTest = await GetUserByTokenResolve(request);

      expect(userTest).to.be.deep.equal(userDB);

      stubFindOne.restore();
      stubVerify.restore();
    });

    it("Should not get an user from database with wrong token", async function() {

      const request = {
        body: {
          token: "umToken"
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        iat: 1606760780
      }

      const userDB = null;

      const error = { 
        error: "Token Inválido, por favor faça login novamente." 
      };


      var stubVerify = sinon.stub(jwt, "verify");
      stubVerify.returns(user);

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.withArgs({ where: { username : user.username }})
      .returns(userDB);

      try {
        await GetUserByTokenResolve(request);

      } catch (err) {
        expect(err).to.be.deep.equal(error);
      }

      stubFindOne.restore();
      stubVerify.restore();
    });

  //   it.skip("Should find all news", async function() {

  //     var newsFake = [
  //       {
  //         news_id: 7,
  //         title: "Teste",
  //         subtitle: "TesteSub",
  //         text: "Testetext",
  //         image1: "testeImagem1",
  //         image2: "testeImagem1",
  //         image3: "testeImagem1",
  //         post_id: 7
  //       },
  //       {
  //         news_id: 2,
  //         title: "Teste2",
  //         subtitle: "TesteSub",
  //         text: "Testetext",
  //         image1: "testeImagem1",
  //         image2: "testeImagem1",
  //         image3: "testeImagem1",
  //         post_id: 2
  //       },
  //     ];

  //     var stub = sinon.stub(News, "findAll");
  //     stub.returns(newsFake);   

  //     const news = await FindAllResolve();

  //     expect(news).to.be.equal(newsFake);

  //     stub.restore();

  //   });

  //   it.skip("Should find news by id", async function() {
  //     var request = {
  //       params: {
  //         news_id: 7
  //       }
  //     };

  //       var newsFake = {
  //         news_id: 7,
  //         title: "Teste",
  //         subtitle: "Tão batendo um racha na frente do instituto",
  //         text: "imagem",
  //         image1: "testeImagem1",
  //         image2: "testeImagem1",
  //         image3: "testeImagem1",
  //         post_id: 2
  //       };

  //     var stub = sinon.stub(News, "findOne");
  //     stub.withArgs({ where: { news_id: request.params.news_id }} ).returns(newsFake);      

  //     const news = await FindByIdResolve(request) ;

  //     expect(news).to.be.equal(newsFake);

  //     stub.restore();
  //   });

  //   it.skip("Should not find news by non existent id", async function() {
  //     var request = {
  //       params: {
  //         news_id: 10
  //       }
  //     };

  //     const newsNull = null;

  //     var stub = sinon.stub(News, "findOne");
  //     stub.withArgs({ where: { news_id: request.params.news_id }} ).returns(newsNull);      

  //     try {
  //       await FindByIdResolve(request);
    
  //     } catch(err) {
  //       expect(err).to.be.deep.equal({ message: "News id not found" });
  //     }

  //     stub.restore();
  //   });

  //   it.skip("Should update news by id", async function() {
      
  //     const request = {
  //       params: {
  //         news_id: 7
  //       },
  //       body: {
  //         title: "TesteUpdate",
  //         subtitle: "TesteSubUpdate",
  //         text: "TesteTextUpdate",
  //         image1: "testeImagem1Update",
  //         image2: "testeImagem1Update",
  //         image3: "testeImagem1Update",
  //         post_id: 7
  //       }
  //     };
      
  //     var newsFake = {
  //       news_id: 7,
  //       title: "Teste",
  //       subtitle: "TesteSub",
  //       text: "TesteText",
  //       image1: "testeImagem1",
  //       image2: "testeImagem1",
  //       image3: "testeImagem1",
  //       post_id: 7
  //     };

  //     var newsUpdate = {
  //       title: "TesteUpdate",
  //       subtitle: "TesteSubUpdate",
  //       text: "TesteTextUpdate",
  //       image1: "testeImagem1Update",
  //       image2: "testeImagem1Update",
  //       image3: "testeImagem1Update",
  //       post_id: 7
  //     };

  //     var stubFindOne = sinon.stub(News, "findOne");
  //     stubFindOne.withArgs({ where: { news_id: request.params.news_id }})
  //     .onCall(0).returns(newsFake)
  //     .onCall(1).returns(newsUpdate);

  //     var stubUpdate = sinon.stub(News, "update");
  //     stubUpdate.withArgs({
  //       title: request.body.title,
  //       subtitle: request.body.subtitle,
  //       text: request.body.text,
  //       image1: request.body.image1,
  //       image2: request.body.image2,
  //       image3: request.body.image3,
  //       post_id: request.body.post_id
  //     }).returns(newsUpdate);

  //     const newsTest = await UpdateNewsResolve(request);

  //     expect(newsTest).to.be.equal(newsUpdate);

  //     stubFindOne.restore();
  //     stubUpdate.restore();
  //   });

  //   it.skip("Should not update news by non existent id", async function() {
  //     const request = {
  //       params: {
  //         news_id: 7
  //       },
  //       body: {
  //         title: "TesteUpdate",
  //         subtitle: "TesteSubUpdate",
  //         text: "TesteTextUpdate",
  //         image1: "testeImagem1Update",
  //         image2: "testeImagem1Update",
  //         image3: "testeImagem1Update",
  //         post_id: 7
  //       }
  //     };

  //     const newsNull = null;

  //     var stubFindOne = sinon.stub(News, "findOne");
  //     stubFindOne.withArgs({ where: { news_id: request.params.news_id }})
  //     .returns(newsNull);

  //     try {

  //       await UpdateNewsResolve(request);

  //     } catch(err) {
  //       expect(err).to.be.deep.equal({ message: "News not found" });
  //     }

  //     stubFindOne.restore();

  //   });

  //   it.skip("Should delete news by id", async function() {
  //     var request = {
  //       params: {
  //         news_id: 7
  //       }
  //     };

  //     const news_id = request.params.news_id;

  //     var newsFake = {
  //       news_id: 7,
  //       title: "Teste",
  //       subtitle: "TesteSub",
  //       text: "TesteText",
  //       image1: "testeImagem1",
  //       image2: "testeImagem1",
  //       image3: "testeImagem1",
  //       post_id: 7
  //     };

  //     const stubFindOne = sinon.stub(News, "findOne");
  //     stubFindOne.withArgs({ where: { news_id }}).returns(newsFake);

  //     const stubDelete = sinon.stub(News, "destroy");
  //     stubDelete.withArgs({ where: { news_id }}).returns(1);

  //     const deteledNews = await DeleteNewsResolve(request);

  //     expect(deteledNews).to.be.equal(1);

  //     stubDelete.restore();
  //     stubFindOne.restore();

  //   });

  //   it.skip("Should not delete news by non existent id", async function() {
  //     var request = {
  //       params: {
  //         news_id: 7
  //       }
  //     };

  //     const news_id = request.params.news_id;

  //     const newsNull = null;

  //     const stubFindOne = sinon.stub(News, "findOne");
  //     stubFindOne.withArgs({ where: { news_id }}).returns(newsNull);

  //     try {
  //       await DeleteNewsResolve(request);
  //     } catch(err) {
  //       expect(err).to.be.deep.equal({ message: "News id not found" });
  //     }

  //   });

  });
});