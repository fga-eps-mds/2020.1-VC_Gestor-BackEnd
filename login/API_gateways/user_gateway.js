//Gateways for user routs

const express = require('express')
const router = express.Router()
const asyncHandler = require('..Helpers/asyncHandler')
const validate = require('validate.js')

//rout to create a user

/**
 * first_name 	: string
 * last_name 	: string
 * username 	: string
 * password 	: string
 * email		: string
 */

router.POST('/',asyncHandler((req,res)=>{
	const constraints 	= {
		first_name:{
			presence: true,
			length:{maximum:50}
		},
		last_name:{
			presence: true,
			length:{maximum:50}
		},	
		username:{
			presence: true,
			length:{minimum:8,maximum:30}
		},
		password:{
			presence: true,
			length:{minimum:8,maximum:30}
		},
		email:{
			presence:true,
			email: true
		}
	}
	const first_name 	= req.body.first_name
	const last_name		= req.body.last_name	
	const username 		= req.body.username
	const password		= req.body.password
	const email			= req.body.email

	const validation 	= validate({first_name,last_name,username,password,email},constraints)

	if (validation) {
		return res.status(400).json({error: validation})
	}
}))

module.exports = router

