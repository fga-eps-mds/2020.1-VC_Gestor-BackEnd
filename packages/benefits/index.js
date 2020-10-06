const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize("postgres://developer:developer@172.25.0.2:5432/dev_database");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

try{
	sequelize.authenticate();
	console.log("Connection has been established successfully.");
}catch(error){
	console.error("Unable to connect to the database:", error);
}

function defineBenefits(){
	const Benefit = sequelize.define("Benefit", {
		benefitID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		redeemWay: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		schema: "benefits",
		timestamps: false
	});
	

	return Benefit;
}

const Benefit = defineBenefits();
 
async function initModel(){
	//await sequelize.createSchema("benefits",{ifNotExists: true});
	await Benefit.sync();
	//console.log("Database synchronized");
}

////////////////////////////ALL BENEFITS///////////////////////////////////////

app.route("/benefits",)
	.get(async function(req, res){
		try{
			const allBenefits = await Benefit.findAll();
			res.send(allBenefits);
		}catch(e){
			res.send("Não foi possível conectar com o banco de dados...");
		}
	})
	.post(async function(req, res){
		if(req.body.title != null &&
		req.body.description != null && req.body.price != null &&
		req.body.redeemWay != null && req.body.quantity != null){
			try{
				if(isNaN(Number(req.body.quantity)) || isNaN(Number(req.body.price))){
					throw "Invalid Number";
				}

				const newBenefit = Benefit.build({
					title: req.body.title,
					description: req.body.description,
					price: Number(req.body.price),
					redeemWay: req.body.redeemWay,
					quantity: Number(req.body.quantity)
				});
				
				await newBenefit.save();

				res.send("Benefício criado com sucesso!");	
			}catch(e){
				res.send("Ocorreu um erro e não foi possível gravar o benefício solicitado\nPor favor, cheque se a formatação da requisição está correta");
			}
		}else{
			res.send("Os dados postados não seguem a estrutura padrão...");
		}
	})
	.delete(async function(req, res){
		try{
			await Benefit.destroy({
				where: {}
			});

			res.send("Todos os benefícios foram excluídos com sucesso!");
		}catch(e){
			res.send("Ocorreu um erro ao tentar excluir todos os benefícios.");
		}
	});

///////////////////////////////////One Benefit/////////////////////////////////

app.route("/benefits/:benefitID")
	.get(async function(req, res){
		try{
			const benefit = await Benefit.findOne({
				where: {
					benefitID : req.params.benefitID
				}
			});

			res.send(benefit);	
		}catch(e){
			res.send("Ocorreu um erro ao buscar o benefício solicitado.");
		}
		
	})
	.put(async function(req, res){
		if(req.body.benefitID != null && req.body.title != null &&
		 req.body.description != null && req.body.price != null &&
		  req.body.redeemWay != null && req.body.quantity != null){
			try{
				if(isNaN(Number(req.body.quantity)) || isNaN(Number(req.body.price)))
					throw "Invalid Number";
				await Benefit.update({
					benefitID: Number(req.body.benefitID),
					title: req.body.title,
					description: req.body.description,
					price: Number(req.body.price),
					redeemWay: req.body.redeemWay,
					quantity: Number(req.body.quantity)
				}, {
					where: {
						benefitID: req.params.benefitID
					}
				});

				res.send("O benefício foi atualizado com sucesso");
			}catch(e){
				res.send("Ocorreu um erro ao atualizar o benefício solicitado.");
			}
		}else{
			res.send("Os dados postados não seguem a estrutura padrão...");
		}
	})
	.patch(async function(req, res){
		try{
			await Benefit.update(req.body, {
				where: {
					benefitID: req.params.benefitID
				}
			});

			res.send("O benefício foi atualizado com sucesso");
		}catch(e){
			res.send("Ocorreu um erro ao atualizar o benefício solicitado.");
		}
	})
	.delete(async function(req, res){
		try{
			await Benefit.destroy({
				where: {
					benefitID: req.params.benefitID
				}
			});

			res.send("Benefício excluído com sucesso!");
		}catch(e){
			res.send("Ocorreu um erro ao excluir o benefício solicitado");
		}
	});
///////////////////////////////////////////////////////////////////////////////

app.listen(3003, () => {
	initModel();
	console.log("Servidor rodando na porta 3003");
});