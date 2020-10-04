const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = require('chai').should();
var assert = require('assert');

// const controller = require('../../controller')
chai.use(require('sinon-chai'));

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
]
const stub = {findAll: sinon.stub().returns(posts)};

let result;

const service = require('../../controller/postService')

describe('Controller', function(){ 
    
    it('Check GET Response type', function() {
        return service.getAllPosts(stub.findAll()).then(function(x) {
            assert.strictEqual(typeof(x), 'object')
        })   
    })
    it('Check GET Response not empty', function() {
        return service.getAllPosts(stub.findAll()).then(function(x) {
            x[0].should.not.be.empty;
        })   
    })    
})