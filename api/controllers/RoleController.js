/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addRole : function(req, res){
		if(req.method=='GET'){
			sails.log('[RoleController.addRole]: GET ');
			return res.view('user/addRole');
		}else if(req.method=='POST'){
			sails.log('[RoleController.addRole]: POST ');
			Role.findOrCreate({
				role:req.param('role')
			}).exec(function(err, result){
				if(err) {
					sails.log.error(err);
					return res.view('user/addRole', {message:err,status:'error'});
				}
				sails.log.info(result);
				return res.view('user/addRole',{message:'New Role Added: ' + req.param('role'), status:'success'});
			});
		}
	},
	listRoles: function(req, res){
		Role.find().exec(function(err, result){
			if(err) return res.view('error', err);
			return res.view('user/listRoles', {roles:result});
		});
	},
	editRole: function(req, res){
		if(req.method=='GET'){
			Role.findOne({
				id:req.param('id')
			}).exec(function(err, role){
				sails.log(role);
				if(err) return res.view('error', err);
				return res.view('user/editRole', {role});
			});
		}
		else if(req.method =='POST'){
			Role.findOne({
				id:req.param('id')
			}).exec(function(err, role){

				if (err) return res.view('error', err);
				role.role = req.param('role');

				role.save(function(err){
					if (err) return res.view('error', err);
					return res.view('home',{message: 'Role: ' +role.role + ' updated succesfully', status:"success"} );
				});
			});
		}
	},
	removeRole: function(req, res){
		Role.destroy({
			id: req.param('id')
		}).exec(function(err){
			if (err) return res.view('error', err);
			return res.view('home',{
				message:"Role has been removed",
				status:'success'
			});
		});
	}

};
