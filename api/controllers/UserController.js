/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login : function(req, res){

		var login = req.param('login');
		var pw = req.param('pw');
		//console.log(req.session);

		User.findOne({
			login: req.param('login'),
			password: req.param('pw')
		}).populate('roles')
		.exec( function(err, user){
			if(err || typeof user == 'undefined') {
				sails.log.info("[Login]: " + req.param('login') + " login fail");
				return res.view('user/login', {
					message:'login credentials are incorrect',
					status: 'error'
				});
			}
			else{
				//sails.log(user);
				req.session.me = user.id;
				req.session.name = user.f_name;
				sails.log.info("[Login]: " + user.login + " logged in");
				return res.view('home');
			}
		});
	},
	logout : function(req, res){
		sails.log.info("[Logout]: ID:" + req.session.me );
		req.session.me = null;
		req.session.destroy();
		return res.view('user/login', {
			message : "You have been logged out.",
			status: 'success'
		});
	},

	listUsers : function(req, res){
		var message = null;
		if(req.param('message')){
			message = req.param('message');
		};
		if(req.param('inactive') == 'show'){
			User.find({sort: 'active DESC'}).populate('roles')
			.exec(function(err, users){
				return res.view('user/listUsers', {users});
			});
		}
		else{
			User.find({
				active: true
			}).populate('roles')
			.exec(function(err, users){
				//sails.log(users);
				return res.view('user/listUsers', {users});
			});
		}
	},

	addUser : function(req, res){
		if(req.method == "GET"){
			return res.view('user/addUser');
		}
		if(req.param('login') == '' ||  req.param('email') == ''){
			return res.view('user/addUser',{
				message: "Required fields are empty",
				status: 'warning'
			})
		}
		User.create({
			login: req.param('login'),
			f_name: req.param('f_name'),
			l_name: req.param('l_name'),
			email: req.param('email'),
			password: req.param('password'),
			active: true
		}).exec(function(err,result){
			if (err) {
				sails.log(err);
				return res.view('user/addUser',{
					message: err,
					status: 'error'
				});
			} else {
				sails.log.info("new user created: " + result.login);
				//sails.log(result);

				return res.view('user/addUser',{
					message: "New User Created: " + result.login,
					status: 'success'
				});
			}
		});
	},
	editUser : function(req, res){

		if(req.method == 'GET'){
			if(!req.param('id')){
				return res.redirect('user/listUsers');
			}
			UserService.getAllRoles({}, function(err,roles){
				if(err) return res.view('error',err);
				UserService.getUserById({
				 id: req.param('id')
			 }, function(err, user){
				 if(err) return res.view('error', err);
					sails.log(user);
					return res.view('user/editUser', {user, roles} );
				});
			});
		}
		else if( req.method == 'POST'){
			if(req.param('login') == '' ||  req.param('email') == ''){
				return res.view('user/editUser',{
					message: "Required fields are empty",
					status: 'warning'
				})
			}

			UserService.getAllRoles({}, function(err,roles){
				if(err) return res.view('error',err);

				UserService.getUserById({
					id: req.param('id')
				}, function(err, user){
						//console.log(user);
						var temp = JSON.parse(JSON.stringify(user)); //copy user
						user.login = req.param('login');
						user.f_name = req.param('f_name');
						user.l_name = req.param('l_name');
						user.email = req.param('email');
						user.active = req.param('active');
						if(req.param('password') != ''){
							user.password = req.param('password');
						}

						var add = req.param('roles_add');
						//sails.log(req.param('roles_add'));
						var remove = req.param('roles_remove');
						//sails.log(req.param('roles_remove'));

						//add/remove user roles
						for(var i =0; i < add.length; i++){
							if(add[i] != '') user.roles.add(add[i]);
						}
						for(var i =0; i < remove.length; i++){
							if(remove[i] != '') user.roles.remove(remove[i]);
						}

						//save result
						user.save(function(err){
							//console.log(user);
							if(err) {
								user = temp;
								sails.log.error(err);
								return res.view('user/editUser', {
									roles,
									message: err,
									status: 'error',
									user: temp,
									id: req.param('id')
								});
							}
							else{
								sails.log.info("User: " + user.login + " has been updated...");
								return res.view('home',{
									id: req.param('id'),
									message : "User: " + user.login + " has been updated",
									status: "success"
								} );
							}
						});
					});

				});
			}
	}

};
