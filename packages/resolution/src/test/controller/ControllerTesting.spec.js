const sinon = require("sinon")
var chai = require("chai");
var assert = require("assert");
const service = require("../../controller/postService")
const controller = require("../../controller/PostController")

chai.use(require("sinon-chai"));

const posts = [
    {
        "post_id": 15,
        "title": "Racha de carro",
        "description": "Tão batendo um racha na frente do instituto",
        "image": "imagem",
        "user_id": 7,
        "category_id": 4,
        "place_id": 1,
        "status": "Revisado",
        "dt_creation": "2020-08-08T00:00:00.000Z",
        "likes": "0",
        "user": {
            "user_id": 7,
            "name": "Ariel",
            "surname": "Vieira",
            "username": "sixwings",
            "password": "123123",
            "email": "adriel@gmail.com"
        },
        "category": {
            "category_id": 4,
            "category_name": "Roubo de carro"
        },
        "place": {
            "place_id": 1,
            "place_name": "Instituto Central de Ciências"
        }
    }
];

const update_post = {
    "post_id": 1,
    "title": "Ataque na rua",
    "description": "Dois caras tão se atacando aqui e tão inuriados no chão",
    "image": "imagem",
    "user_id": 2,
    "category_id": 3,
    "place_id": 1,
    "status": "Não Revisado",
    "dt_creation": "2020-02-08T00:00:00.000Z",
    update: sinon.stub()
};

const stub = {findAll: sinon.stub().returns(posts)};


describe("Controller", function(){ 
    describe("GET ALL POSTS", function() {
        it("Check GET Response correct type", function() {
            return service.getAllPosts(stub.findAll()).then(function(x) {
                assert.strictEqual(typeof(x), "object");
            })   
        })
        it("Check GET Response not empty", function() {
            return service.getAllPosts(stub.findAll()).then(function(x) {
                x[0].should.not.be.empty;
            })   
        }) 
    })
    describe("UPDATE POST BY ID", function() {
        var request;
        var response;
        request = {params: {post_id: 1}, body: {state: "Revisado"}, stubPost: update_post};
        response = {json: sinon.stub()};
        it("Update with a new valid status", function() {
            controller.statusChange(request, response);
        })
        it("Update with a new not valid status (same status it was)", function() {
            request = {params: {post_id: 1}, body: {state: "Não Revisado"}, stubPost: update_post};
            response = {status: sinon.stub(), json: sinon.stub()};
            return controller.statusChange(request, response).catch((error) => {
                if (typeof error === "object") {
                    return true; // se existe
                } 
            }).should.eventually.equal(true) ;
        })
        it("Update with a empty that doesnt exists", function() {
            request = {params: {post_id: 1}, body: {state: "Revisado"}, stubPost: {}};
            response = {status: sinon.stub(), json: sinon.stub()};
            return controller.statusChange(request, response).catch((error) => {
                if (typeof error === "object") {
                    return true; // se existe 
                } 
                }).should.eventually.equal(true) 
        })
    })
})