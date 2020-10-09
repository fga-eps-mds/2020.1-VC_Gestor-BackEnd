var controller = require("../../controller/PostController");
var should = require("chai").should();
var expect = require("chai").expect;
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
const proxyquire = require("proxyquire");

const Place = require("../../models/place");
const Category = require("../../models/category");
const User = require("../../models/user");

chai.use(require("sinon-chai"));
chai.use(chaiAsPromised);
chai.should();

const {
    sequelize,
    dataTypes,
    checkPropertyExists,
  } = require("sequelize-test-helpers");

const PostModel = require("../../models/post");

describe("Model", function() {
    describe("Post Instance Testing", function() {
        const Model = PostModel(sequelize, dataTypes);
        const instance = new Model();

        context("Post Properties", () => {
            ["post_id", "title", "description", "image", 
            "user_id", "category_id","place_id", "status", "dt_creation"].forEach(checkPropertyExists(instance));
        });

        context("Post Associations", () => {
            it("With Place Table", () => {
                expect(Model.belongsTo).to.have.been.calledWith(Place);
            })
            it("With Category Table", () => {
                expect(Model.belongsTo).to.have.been.calledWith(Category);
            })
            it("With User Table", () => {
                expect(Model.belongsTo).to.have.been.calledWith(User);
            });
        });
    });
});
