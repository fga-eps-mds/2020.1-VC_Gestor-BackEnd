const sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");

const { AuthResolve } = require("../controller/AuthResolve");
const { ChangePasswordResolve } = require("../controller/ChangePasswordResolve");
const { CheckCodeResolve } = require("../controller/CheckCodeResolve");
const { EditUserResolve } = require("../controller/EditUserResolve");
const { GetUserByTokenResolve } = require("../controller/GetUserByTokenResolve");
const { SendEmailResolve } = require("../controller/SendEmailResolve");

const sequelize = require("sequelize");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const CryptoResolve  = require("../middlewares/CryptoResolve");

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

     it("Should authenticate user and get token", async function() {

      const request = {
        body: {
          username: "UsernameTest",
          password: "123456",
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456",
      };

      const token = "umToken";


      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.withArgs({ where: { username : user.username }})
      .returns(user);

      var stubVerify = sinon.stub(jwt, "sign");
      stubVerify.returns(token);

      const tokenTest = await AuthResolve(request);

      expect(tokenTest).to.be.deep.equal({user, token});

      stubFindOne.restore();
      stubVerify.restore();

     });

     it("Should not authenticate user if wrong username", async function() {
      const request = {
        body: {
          username: "UsernameTest",
          password: "123456",
        }
      };

      const user = null;

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.withArgs({ where: { username : request.username }})
      .returns(user);

       try {
         await AuthResolve(request);
        } catch(err) {
         expect(err).to.be.deep.equal({ error: "username/password incorrect!" });
        }

       stubFindOne.restore();
     });

     it("Should not authenticate user if wrong password", async function() {
      
      const request = {
        body: {
          username: "UsernameTest",
          password: "123456",
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "654321",
      };

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.withArgs({ where: { username : request.username }})
      .returns(user);

       try {
         await AuthResolve(request);
        } catch(err) {
         expect(err).to.be.deep.equal({ error: "username/password incorrect!" });
        }

       stubFindOne.restore();
     });

     it("Should edit user with token", async function() {
      const request = {
        body: {
          token: "umToken",
          username: "UsernameTest",
          surname: "SurnameTest",
          name: "NameTest",
          email: "test@test.com"
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456",
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
      };

      const userUpdated = {
        username: "UsernameTest",
        name: "TestName2",
        surname: "TestSurname2",
        email: 'test2@test.com',
      };

      const token = "umToken";

      var stubVerify = sinon.stub(jwt, "verify");
      stubVerify.returns(user);

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.withArgs({ where: { username : user.username }})
      .onFirstCall().returns(userDB)
      .onSecondCall().returns(userUpdated);

      var mock = sinon.mock(User);
      var expectation = mock.expects("update");
      expectation.exactly(1);

      var stubSign = sinon.stub(jwt, "sign");
      stubSign.returns(token);

      const tokenTest = await EditUserResolve(request);

      expect(tokenTest).to.be.deep.equal(token);

      stubFindOne.restore();
      stubVerify.restore();
      stubSign.restore();
      mock.restore();
     });

     it("Should edit user if want to change username", async function() {
      const request = {
        body: {
          token: "umToken",
          username: "UsernameTest2",
          surname: "SurnameTest",
          name: "NameTest",
          email: "test@test.com"
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456",
      };

      const userDB = {
        username: "UsernameTest2",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
      };

      const userUpdated = {
        username: "UsernameTest2",
        name: "TestName2",
        surname: "TestSurname2",
        email: 'test2@test.com',
      };

      const token = "umToken";

      var stubVerify = sinon.stub(jwt, "verify");
      stubVerify.returns(user);

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne
      .onFirstCall().returns(userDB)
      .onSecondCall().returns(null)
      .onThirdCall().returns(userUpdated);

      var mock = sinon.mock(User);
      var expectation = mock.expects("update");
      expectation.exactly(1);

      var stubSign = sinon.stub(jwt, "sign");
      stubSign.returns(token);

      const tokenTest = await EditUserResolve(request);

      expect(tokenTest).to.be.deep.equal(token);

      stubFindOne.restore();
      stubVerify.restore();
      stubSign.restore();
      mock.restore();

     });

     it("Should not edit user if username is already took", async function() {
      const request = {
        body: {
          token: "umToken",
          username: "UsernameTest2",
          surname: "SurnameTest",
          name: "NameTest",
          email: "test@test.com"
        }
      };

      const user = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456",
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
      };

      const userSameDB = {
        username: "UsernameTest2",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
      };

      var stubVerify = sinon.stub(jwt, "verify");
      stubVerify.returns(user);

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.onFirstCall().returns(userDB)
      .onSecondCall().returns(userSameDB);

      try {
        await EditUserResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal({ error: "Nome de usuário inválido!" });
      }

      stubFindOne.restore();
      stubVerify.restore();
     });

     it("Should check email and code", async function() {
      const request = {
        body: {
          code: "aaaaaa",
          email: "test@test.com"
        }
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        coderetrieve: "aaaaaa",
        dateretrive: sequelize.fn("NOW")
      };

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      const body = {
        email: request.body.email,
        date: (new Date().getTime()),
        operation: 1
      };

      const generatedToken = CryptoResolve.signBody(body);

      const newToken = await CheckCodeResolve(request);
      expect(typeof(newToken)).to.be.equal(typeof({token: generatedToken}));

      stubFindOne.restore();
     });

     it("Should not check email and code if user is not found", async function() {
      const request = {
        body: {
          code: "aaaaaa",
          email: "test@test.com"
        }
      };

      const userDB = null;

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      try {
        await CheckCodeResolve(request);

      } catch (err) {
        expect(err).to.be.deep.equal({ error: "Este email não existe!" });
      }

      stubFindOne.restore();
     });

     it("Should not check email and code if coderetrieve doesn't match", async function() {
      const request = {
        body: {
          code: "aaaaaa",
          email: "test@test.com"
        }
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        coderetrieve: "bbbbbb",
        dateretrive: sequelize.fn("NOW")
      };


      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      try {
        await CheckCodeResolve(request);

      } catch (err) {
        expect(err).to.be.deep.equal({ error: "Código incorreto" });
      }

      stubFindOne.restore();
     });

     it("Should not check email and code if code is expired ", async function() {
      const request = {
        body: {
          code: "aaaaaa",
          email: "test@test.com"
        }
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        coderetrieve: "aaaaaa",
        dateretrive: 2
      };


      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      try {
        await CheckCodeResolve(request);

      } catch (err) {
        expect(err).to.be.deep.equal({ error: "Código expirado" });
      }

      stubFindOne.restore();
     });

     it("Should change the password with token", async function() {
      const request = {
        body: {
          newPassword: "654321",
          token: "oneToken"
        }
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456"
      };

      const userUpdatedDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "654321"
      };

      const splittedToken = {
        body: {
          email: 'teste@teste.com',
          date: sequelize.fn("NOW"),
          operation: 1
        },
        valid: true
      }

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.onFirstCall().returns(userDB)
      .onSecondCall().returns(userUpdatedDB);

      var stubSplitToken = sinon.stub(CryptoResolve, "splitToken");
      stubSplitToken.returns(splittedToken);

      var mock = sinon.mock(User);
      var expectation = mock.expects("update");
      expectation.exactly(1);

      const changePasswordTest = await ChangePasswordResolve(request);

      expect(changePasswordTest).to.be.deep.equal(userUpdatedDB);


      stubFindOne.restore();
      stubSplitToken.restore();
      mock.restore();
     });

     it("Should not change the password if not valid", async function() {
      const request = {
        body: {
          newPassword: "654321",
          token: "oneToken"
        }
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456"
      };

      const splittedToken = {
        body: {
          email: 'teste@teste.com',
          date: sequelize.fn("NOW"),
          operation: 1
        },
        valid: false
      }

      const errorValid = { 
        error: "Erro inesperado, token de troca de senha inválido! Por favor, tente novamente." 
      };

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      var stubSplitToken = sinon.stub(CryptoResolve, "splitToken");
      stubSplitToken.returns(splittedToken);

      try {
        await ChangePasswordResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal(errorValid);
      }

      stubFindOne.restore();
      stubSplitToken.restore();
     });

     it("Should not change the password if date is expired", async function() {
      const request = {
        body: {
          newPassword: "654321",
          token: "oneToken"
        }
      };

      const userDB = {
        username: "UsernameTest",
        name: "TestName",
        surname: "TestSurname",
        email: 'test@test.com',
        password: "123456"
      };

      const splittedToken = {
        body: {
          email: 'teste@teste.com',
          date: 1,
          operation: 1
        },
        valid: true
      }

      const errorTime = { error: "Troca de senha expirada!" };

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      var stubSplitToken = sinon.stub(CryptoResolve, "splitToken");
      stubSplitToken.returns(splittedToken);


      try {
        await ChangePasswordResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal(errorTime);
      }

      stubFindOne.restore();
      stubSplitToken.restore();
     });

     it("Should not change the password if date is expired", async function() {
      const request = {
        body: {
          newPassword: "654321",
          token: "oneToken"
        }
      };

      const userDB = null;

      const splittedToken = {
        body: {
          email: 'teste@teste.com',
          date: sequelize.fn("NOW"),
          operation: 1
        },
        valid: true
      }

      const errorTime = { error: "Este email não existe!" };

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      var stubSplitToken = sinon.stub(CryptoResolve, "splitToken");
      stubSplitToken.returns(splittedToken);


      try {
        await ChangePasswordResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal(errorTime);
      }

      stubFindOne.restore();
      stubSplitToken.restore();
     });

     it("Should not send email if user not found", async function() {
      const request = {
        body: {
          email: "teste@teste.com",
        }
      };

      const userDB = null;

      const errorUser = { error: "Esse email não existe!" };

      var stubFindOne = sinon.stub(User, "findOne");
      stubFindOne.returns(userDB);

      var mock = sinon.mock(CryptoResolve);
      mock.expects("makeCode").exactly(1);

      try {
        await SendEmailResolve(request);
      } catch (err) {
        expect(err).to.be.deep.equal(errorUser);
      }

      stubFindOne.restore();
      mock.restore();
     });
  });
});

describe("Middlewares", function() {
  describe("CryptoResolve", function() {
    it("Should make a new code", async function() {
      const newCode = CryptoResolve.makeCode();

      expect(newCode).to.be.an("string");

     });

     it("Should split token", async function() {
      const token = "eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJkYXRlIjoxNjA2OTY1OTUwNDE4LCJvcGVyYXRpb24iOjF9.396fcdd6e603be2a075eae17f58cd0fcb60a95c89e1ce9cc00e8aa808050bbd6";

      const splitFake = {
        body: {
          email: "test@test.com",
          date: 1606965950418,
          operation: 1
        },
        valid: true
      };

      const splitTest = CryptoResolve.splitToken(token);

      expect(splitTest).to.be.deep.equal(splitFake);

     });

     it("Should not split token if lenght is wrong", async function() {
      const token = "eyJlbWFpbCI6InRlc3RAdGVzdC5.jb20iLCJkYXRlIjoxNjA2OTY1OTUwNDE4LCJvcGVyYXRpb24iOjF9.396fcdd6e603be2a075eae17f58cd0fcb60a95c89e1ce9cc00e8aa808050bbd6";

      const splitFake = {
        body: {},
        valid: false
      };

      const splitTest = CryptoResolve.splitToken(token);

      expect(splitTest).to.be.deep.equal(splitFake);

     });
  });
});