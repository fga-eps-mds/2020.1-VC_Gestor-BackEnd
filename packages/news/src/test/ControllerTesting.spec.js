const sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");

const { CreateResolve } = require("../controller/CreateResolve");
const { FindAllResolve } = require("../controller/FindAllResolve");
const { FindByIdResolve } = require("../controller/FindByIdResolve");
const { UpdateNewsResolve } = require("../controller/UpdateNewsResolve");
const { DeleteNewsResolve } = require("../controller/DeleteNewsResolve");


const News = require("../models/news");

chai.use(chaiaspromise);

describe("Controllers",function() {

  describe("News", function() {
    it("Should create a news", async function() {

      const request = {
        body: {
          title: "TesteCreate",
          subtitle: "TesteSubCreate",
          text: "TesteTextCreate",
          image1: "testeImagem1Create",
          image2: "testeImagem1Create",
          image3: "testeImagem1Create",
          post_id: 7
        }
      };

      const newsNull = null;

      var newsCreate = {
        title: "TesteCreate",
        subtitle: "TesteSubCreate",
        text: "TesteTextCreate",
        image1: "testeImagem1Create",
        image2: "testeImagem1Create",
        image3: "testeImagem1Create",
        post_id: 7
      };

      var stubFindOne = sinon.stub(News, "findOne");
      stubFindOne.withArgs({ where: { title: request.body.title }})
      .returns(newsNull);

      var stubCreate = sinon.stub(News, "create");
      stubCreate.withArgs({
        title: request.body.title,
        subtitle: request.body.subtitle,
        text: request.body.text,
        image1: request.body.image1,
        image2: request.body.image2,
        image3: request.body.image3,
        post_id: request.body.post_id
      }).returns(newsCreate);

      const newsTest = await CreateResolve(request);

      expect(newsTest).to.be.equal(newsCreate);

      stubFindOne.restore();
      stubCreate.restore();

    });

    it("Should not create a news with unvalid strings", async function() {

      const request = {
        body: {
          title: "",
          subtitle: "TesteSubCreate",
          text: "TesteTextCreate",
          image1: "testeImagem1Create",
          image2: "testeImagem1Create",
          image3: "testeImagem1Create",
          post_id: 7
        }
      };

      const error = { error: "Fill request.body correctly, cannot be an empty string or null value "};

      try {
        await CreateResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal(error);
      }

    });

    it("Should not create a news with same title", async function() {

      const request = {
        body: {
          title: "TesteCreate",
          subtitle: "TesteSubCreate",
          text: "TesteTextCreate",
          image1: "testeImagem1Create",
          image2: "testeImagem1Create",
          image3: "testeImagem1Create",
          post_id: 7
        }
      };

      var newsFake = {
        news_id: 7,
        title: "Teste",
        subtitle: "Tão batendo um racha na frente do instituto",
        text: "imagem",
        image1: "testeImagem1",
        image2: "testeImagem1",
        image3: "testeImagem1",
        post_id: 2
      };

      var stubFindOne = sinon.stub(News, "findOne");
      stubFindOne.withArgs({ where: { title: request.body.title }})
      .returns(newsFake);

      try {
        await CreateResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal({ error: "News already with this title" });
      }
      stubFindOne.restore();
    });

    it("Should find all news", async function() {

      var newsFake = [
        {
          news_id: 7,
          title: "Teste",
          subtitle: "TesteSub",
          text: "Testetext",
          image1: "testeImagem1",
          image2: "testeImagem1",
          image3: "testeImagem1",
          post_id: 7
        },
        {
          news_id: 2,
          title: "Teste2",
          subtitle: "TesteSub",
          text: "Testetext",
          image1: "testeImagem1",
          image2: "testeImagem1",
          image3: "testeImagem1",
          post_id: 2
        },
      ];

      var stub = sinon.stub(News, "findAll");
      stub.returns(newsFake);   

      const news = await FindAllResolve();

      expect(news).to.be.equal(newsFake);

      stub.restore();

    });

    it("Should find news by id", async function() {
      var request = {
        params: {
          news_id: 7
        }
      };

        var newsFake = {
          news_id: 7,
          title: "Teste",
          subtitle: "Tão batendo um racha na frente do instituto",
          text: "imagem",
          image1: "testeImagem1",
          image2: "testeImagem1",
          image3: "testeImagem1",
          post_id: 2
        };

      var stub = sinon.stub(News, "findOne");
      stub.withArgs({ where: { news_id: request.params.news_id }} ).returns(newsFake);      

      const news = await FindByIdResolve(request) ;

      expect(news).to.be.equal(newsFake);

      stub.restore();
    });

    it("Should not find news by non existent id", async function() {
      var request = {
        params: {
          news_id: 10
        }
      };

      const newsNull = null;

      var stub = sinon.stub(News, "findOne");
      stub.withArgs({ where: { news_id: request.params.news_id }} ).returns(newsNull);      

      try {
        await FindByIdResolve(request);
    
      } catch(err) {
        expect(err).to.be.deep.equal({ message: "News id not found" });
      }

      stub.restore();
    });

    it("Should update news by id", async function() {
      
      const request = {
        params: {
          news_id: 7
        },
        body: {
          title: "TesteUpdate",
          subtitle: "TesteSubUpdate",
          text: "TesteTextUpdate",
          image1: "testeImagem1Update",
          image2: "testeImagem1Update",
          image3: "testeImagem1Update",
          post_id: 7
        }
      };
      
      var newsFake = {
        news_id: 7,
        title: "Teste",
        subtitle: "TesteSub",
        text: "TesteText",
        image1: "testeImagem1",
        image2: "testeImagem1",
        image3: "testeImagem1",
        post_id: 7
      };

      var newsUpdate = {
        title: "TesteUpdate",
        subtitle: "TesteSubUpdate",
        text: "TesteTextUpdate",
        image1: "testeImagem1Update",
        image2: "testeImagem1Update",
        image3: "testeImagem1Update",
        post_id: 7
      };

      var stubFindOne = sinon.stub(News, "findOne");
      stubFindOne.withArgs({ where: { news_id: request.params.news_id }})
      .onCall(0).returns(newsFake)
      .onCall(1).returns(newsUpdate);

      var stubUpdate = sinon.stub(News, "update");
      stubUpdate.withArgs({
        title: request.body.title,
        subtitle: request.body.subtitle,
        text: request.body.text,
        image1: request.body.image1,
        image2: request.body.image2,
        image3: request.body.image3,
        post_id: request.body.post_id
      }).returns(newsUpdate);

      const newsTest = await UpdateNewsResolve(request);

      expect(newsTest).to.be.equal(newsUpdate);

      stubFindOne.restore();
      stubUpdate.restore();
    });

    it("Should not update news by invalid string", async function() {
      const request = {
        params: {
          news_id: 7
        },
        body: {
          title: "TesteUpdate",
          subtitle: "",
          text: "TesteTextUpdate",
          image1: "testeImagem1Update",
          image2: "testeImagem1Update",
          image3: "testeImagem1Update",
          post_id: 7
        }
      };

      const error = { error: "Fill request.body correctly, cannot be an empty string or null value "};

      try {
        await UpdateNewsResolve(request);

      } catch(err) {
        expect(err).to.be.deep.equal(error);
      }
    });

    it("Should not update news by non existent id", async function() {
      const request = {
        params: {
          news_id: 7
        },
        body: {
          title: "TesteUpdate",
          subtitle: "TesteSubUpdate",
          text: "TesteTextUpdate",
          image1: "testeImagem1Update",
          image2: "testeImagem1Update",
          image3: "testeImagem1Update",
          post_id: 7
        }
      };

      const newsNull = null;

      var stubFindOne = sinon.stub(News, "findOne");
      stubFindOne.withArgs({ where: { news_id: request.params.news_id }})
      .returns(newsNull);

      try {

        await UpdateNewsResolve(request);

      } catch(err) {
        expect(err).to.be.deep.equal({ message: "News not found" });
      }

      stubFindOne.restore();

    });

    it("Should delete news by id", async function() {
      var request = {
        params: {
          news_id: 7
        }
      };

      const news_id = request.params.news_id;

      var newsFake = {
        news_id: 7,
        title: "Teste",
        subtitle: "TesteSub",
        text: "TesteText",
        image1: "testeImagem1",
        image2: "testeImagem1",
        image3: "testeImagem1",
        post_id: 7
      };

      const stubFindOne = sinon.stub(News, "findOne");
      stubFindOne.withArgs({ where: { news_id }}).returns(newsFake);

      const stubDelete = sinon.stub(News, "destroy");
      stubDelete.withArgs({ where: { news_id }}).returns(1);

      const deteledNews = await DeleteNewsResolve(request);

      expect(deteledNews).to.be.equal(1);

      stubDelete.restore();
      stubFindOne.restore();

    });

    it("Should not delete news by non existent id", async function() {
      var request = {
        params: {
          news_id: 7
        }
      };

      const news_id = request.params.news_id;

      const newsNull = null;

      const stubFindOne = sinon.stub(News, "findOne");
      stubFindOne.withArgs({ where: { news_id }}).returns(newsNull);

      try {
        await DeleteNewsResolve(request);
      } catch(err) {
        expect(err).to.be.deep.equal({ message: "News id not found" });
      }

    });

  });
});