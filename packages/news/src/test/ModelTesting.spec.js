var controller = require("../controller/NewsController");
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
    sequelize,
    dataTypes,
    checkPropertyExists,
  } = require("sequelize-test-helpers");

const NewsModel = require("../models/news");

describe("Model", function() {
    describe("News Instance Testing", function() {
        const Model = NewsModel(sequelize, dataTypes);
        const instance = new Model();

        context("Post Properties", () => {
            ["news_id", "title", "subtitle", "text", 
            "image1", "image2","image3", "post_id"]
            .forEach(checkPropertyExists(instance));
          }
        );
    });
});
