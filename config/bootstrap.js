/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	var bcrypt = require('bcrypt-nodejs');
  sails.log.info("checking database defaults...")
  //assign default roles here
  var roles = ['admin', 'accounting'];
	roles.forEach(function(role){
    Role.findOrCreate(
      {role:role}
    ).exec(function (err, role) {
			if (err) sails.log.error(err);
		});
	});

	User.find({
		login:'admin'
	}).exec(function(err, user){
		if (err) sails.log.error(err);
		if (user.length == 0){ //if admin doesn't exist, create and add roles
			User.create({
	      login:'admin',
	      email:'admin@localhost',
	      password:bcrypt.hashSync("admin"),
	      f_name:'admin',
	      l_name:'',
	      active: true,
	      temp_pw: false
	    }).exec(function(err, user){
	      if (err) sails.log.error(err);

				Role.findOne({
					role:'admin'
				}).exec(function(err, role){
					user.roles.add({id: role.id});
					user.save(function(err){
						if (err) sails.log.error(err);
						else sails.log.info("default admin login created");
					});
				});
	    });
		}
		else{
			//do nothing since db already has admin login
		}
	});

  cb();

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //cb();
};
