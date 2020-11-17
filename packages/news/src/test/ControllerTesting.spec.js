const sinon = require("sinon");
var chai = require("chai");
var assert = require("assert");
const controller = require("../controller/NewsController");

const News = require("../models/news");

chai.use(require("sinon-chai"));

describe("Controllers", function() {
  describe("News", function() {
    it("Should get one news", function(done) {
      var news = {};

      beforeEach(function() {
        news = {
          news_id: 2,
          title: "Teste",
          subtitle: "Tão batendo um racha na frente do instituto",
          text: "imagem",
          image1: "testeImagem1",
          image2: "testeImagem1",
          image3: "testeImagem1",
          post_id: 2
        };
      });

      var NewsMock = sinon.mock(controller);

      NewsMock.expects("getNewsById").withArgs({news_id: 3}).yields(null, news);

      News.findOne( {where: {news_id: 2}}, function(err, result) {
        NewsMock.verify();
        NewsMock.restore();
        expect(result).to.be.deep.equals(news);
      });

      done();
    });
    it("Should create news", function(done){
      var news = new News({
        title: "Teste de criação",
        subtitle: "Teste de subtitulo",
        text: "Teste texto",
        image1: "Teste Imagem 1",
        image2: "Teste Imagem 2",
        image3: "Teste Imagem 3",
        post_id: 7
      });

      var request = { 
        body: {
          title: "Teste de criação",
          subtitle: "Teste de subtitulo",
          text: "Teste texto",
          image1: "Teste Imagem 1",
          image2: "Teste Imagem 2",
          image3: "Teste Imagem 3",
          post_id: 7
        } 
      };

      var response = {};
      
      var newsMock = sinon.mock(news);
      news = newsMock.object;

      newsMock.expects("save").yields(null, news);

      News.create({ request, response}, function(err, result){
        newsMock.verify();
        newsMock.restore();
        expect(result).to.be.equal(news);
      });

      done();
    });
    it("Should update news", function(done) {
            
      var newsMock = sinon.mock(new News({
        title: "Teste de criação",
        subtitle: "Teste de subtitulo",
        text: "Teste texto",
        image1: "Teste Imagem 1",
        image2: "Teste Imagem 2",
        image3: "Teste Imagem 3",
        post_id: 7
      }));

      var news = newsMock.object;

      newsMock.expects("save").withArgs({news_id: 1}).yields(null, "news");

      news.save({news_id: 1}, function(err, result){
        newsMock.verify();
        newsMock.restore();
        done();
      })  
    })
    it("Should delete news", function(done) {
      var newsMock = sinon.mock(new News({
        title: "Teste de criação",
        subtitle: "Teste de subtitulo",
        text: "Teste texto",
        image1: "Teste Imagem 1",
        image2: "Teste Imagem 2",
        image3: "Teste Imagem 3",
        post_id: 7
      }));
      
      var note = newsMock.object;

      newsMock.expects("destroy").withArgs({news_id: 1}).yields(null, "Delete");

      note.destroy({news_id: 1}, function(err, result){
        newsMock.verify();
        newsMock.restore();
        done();
      });
    })
  });

});
