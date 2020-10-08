const {expect} = require('chai')
const{usernameExists} = require('../../services/users/user_db')
const db = require('../..models')
describe('user db test suite',()=>{
	it('should see if a user alredy exists in data base',assync()=>{
		const check = await usernameExists('alksdfhklsdflk')
		expect(check).to.be.false
		expect(check === undefined).to.be.false
		expect(check === null).to.be.false
	})

	it('should throw an error because no username was passed',async()=>{
		try{
			const check = await UsernameExists()
			catch(e){
				expect(e).to.be.an('Error')
				expect(e.mensage).to.equal('No username was passed as an argument')
			}
		}
	})

	it('should create a user, see if username already exists, and fail', async()=>{
		const test = await db.user.create({
			first_name:'test',
			last_name:'test',
			username:'test_test',
			password:'test_test',
			email:'test@test.com',
			permission_id:1
		})

		cosnt check = await usernameExists('test_test')
		expect(check).to.be.true

		await test.destroy({force:true})
	})
})