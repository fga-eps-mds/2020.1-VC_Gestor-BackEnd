'use strict'

module.exports=(sequelize,Datatypes)=>{
	return sequelize.define('permission'){
		id:{
			type:Datatypes.INTEGER,
			autoincrement:true,
			primaryKey:true
		},
		type:{
			type:Datatypes.STRING,
			required:true,
			allowNull:false,
		},
		updated_at:{type:Datatypes.DATE},
		deleted_at:{type:Datatypes.DATE}		
	},
	{
		underscored:true,
		paranoid:true
	}
}
