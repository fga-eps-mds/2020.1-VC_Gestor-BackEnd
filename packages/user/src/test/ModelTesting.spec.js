var controller = require("../controller/UserController");
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
    checkPropertyExists,
  } = require("sequelize-test-helpers");

const UserModel = require("../models/user");

describe("Model", function() {
    describe("User Instance Testing", function() {
        const instance = new UserModel;

        context("Post Properties", () => {
            ["userid", "name", "surname", "password", 
            "username", "coderetrieve","dateretrive", "email"]
            .forEach(checkPropertyExists(instance));
          }
        );
    });
});
