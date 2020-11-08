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
        "title": "Racha de carro",
        "subtitle": "Tão batendo um racha na frente do instituto",
        "text": "imagem",
        "image1": "testeImagem1",
        "image2": "testeImagem1",
        "image3": "testeImagem1",
        "post_id": 2
    },
];

const oneNews = [
    {
        news_id: 15,
        title: "Racha de carro",
        subtitle: "Tão batendo um racha na frente do instituto",
        text: "imagem",
        image1: "testeImagem1",
        image2: "testeImagem1",
        image3: "testeImagem1",
        post_id: 2
    }
]

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

const stub = {
                findAll: sinon.stub().returns(news),
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
            })
            // it("Should update news by an id", async () => {
            //     var request;
            //     var response;
            //     request = { 
            //         params: { news_id: 15 },
            //         body:{ 
            //             title: "Teste", 
            //             subtitle: "Teste", 
            //             text: "teste", 
            //             image1: "teste", 
            //             image2: "teste", 
            //             image3: "teste",
            //             post_id: 1
            //         }, 
            //         stubPost: oneNews };
            //     response = {json: sinon.stub()};
            //     await controller.putNewsById(request, response);
            // })
            // it("Should delete news by an id", async () => {
            //     var request;
            //     var response;
            //     request = { params: {news_id: 15}, stubPost: oneNews };
            //     response = {json: sinon.stub()};
            //     await controller.deleteNewsById(request, response);
            // })
        });
    })
})