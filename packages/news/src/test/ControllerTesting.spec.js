const sinon = require("sinon");
var chai = require("chai");
var assert = require("assert");
const service = require("../controller/newsService");
const controller = require("../controller/NewsController");

chai.use(require("sinon-chai"));

const news = [
    {
        "news_id": 15,
        "title": "Racha de carro",
        "subtitle": "Tão batendo um racha na frente do instituto",
        "text": "imagem",
        "image1": "testeImagem1",
        "image2": "testeImagem1",
        "image3": "testeImagem1",
        "post_id": 2
    },
    {
        "news_id": 2,
        "title": "Teste",
        "subtitle": "Tão batendo um racha na frente do instituto",
        "text": "imagem",
        "image1": "testeImagem1",
        "image2": "testeImagem1",
        "image3": "testeImagem1",
        "post_id": 2
    },
];

const oneNews = {
        news_id: 15,
        title: "Racha de carro",
        subtitle: "Tão batendo um racha na frente do instituto",
        text: "imagem",
        image1: "testeImagem1",
        image2: "testeImagem1",
        image3: "testeImagem1",
        post_id: 2
    }

const updateNews = {
    "news_id": 1,
    "title": "Titulo teste",
    "subtitle": "Subtitulo teste",
    "text": "imagem",
    "image1": "testeImagem1",
    "image2": "testeImagem1",
    "image3": "testeImagem1",
    "post_id": 2,
    update: sinon.stub()
};

const deleteNews = {
    "news_id": 1,
    "title": "Titulo teste",
    "subtitle": "Subtitulo teste",
    "text": "imagem",
    "image1": "testeImagem1",
    "image2": "testeImagem1",
    "image3": "testeImagem1",
    "post_id": 2,
    destroy: sinon.stub()
};

const stub = {
                findAll: sinon.stub().returns(news),
                findOneWithTitle: sinon.stub().withArgs({title:"Teste"}).returns(news[1]),
            };


describe("Controller", function(){ 
    describe("News", function() {
        describe("Resolve all news", function() {
            it("Should get all news", function(){
                return service.getAllNews(stub.findAll()).then(function(x) {
                    assert.strictEqual(typeof(x), "object");    
                });
            })
            it("Should not get empty news", function(){
                return service.getAllNews(stub.findAll()).then(function(x) {
                    x[0].should.not.be.empty;
                });
            });
        })
        describe("Resolve news by id", function() {
            it("Should get news by an id", async () => {
                var request;
                var response;
                request = { params: {news_id: 15}, stubPost: oneNews };
                response = {json: sinon.stub()};
                const news = await controller.getNewsById(request, response);
            });
            it("Should delete news by an id", () => {
                sinon.assert.fail("Tem que fazer");
            });
            it("Should update news by an id", () => {
                sinon.assert.fail("Tem que fazer");
            });
        });
        describe("Resolve news by title", function() {
            it("Should get a news by title", function(){
                return service.getNewsByTitle(stub.findOneWithTitle({title:"Teste"})).then(function(x) {
                    assert.strictEqual( x, news[1] );    
                });
            })
        });
        describe("Create a news", function() {
            it("Should create a news", function(){
                sinon.assert.fail("Tem que fazer");
            })
            it("Should not create a news with the same title", function() {
                sinon.assert.fail("Tem que fazer");
            })
        });
        describe("CRUD errors", function() {
            it("Should get error if a news it not found at getNewsById", function(){
                var request;
                var response;
                request = {params: {news_id: 2}, stubPost: oneNews};
                response = {json: sinon.stub()};
                return controller.getNewsById(request, response).catch((error) => {
                    if (typeof error === "object") {
                        return true; // se existe
                    } 
                }).should.eventually.equal(true);

            })
            it("Should get error if a news it not found at putNewsById", function(){
                var request;
                var response;
                request = {params: {news_id: 2}, stubPost: oneNews};
                response = {json: sinon.stub()};
                return controller.putNewsById(request, response).catch((error) => {
                    if (typeof error === "object") {
                        return true; // se existe
                    } 
                }).should.eventually.equal(true);

            })
            it("Should get error if a news it not found at deleteNewsById", function(){
                var request;
                var response;
                request = {params: {news_id: 2}, stubPost: oneNews};
                response = {json: sinon.stub()};
                return controller.deleteNewsById(request, response).catch((error) => {
                    if (typeof error === "object") {
                        return true; // se existe
                    } 
                }).should.eventually.equal(true);

            })

        });
        
    })
})