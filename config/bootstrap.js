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
  sails.log.info("checking database defaults...")
  //assign default roles here
  var roles = ['admin', 'accounting'];
  for(var i = 0 ; i< roles.length; i++){
    Role.findOrCreate(
      {role:roles[i]}, {role:roles[i]}
    ).exec(function (err, role) {
      if (err) return cb(err);
      User.findOrCreate({
        login:'admin',
        email:'admin@localhost',
        password:'',
        f_name:'admin',
        l_name:'',
        active: true
      }).exec(function(err, user){
        if (err) return cb(err);
        user.roles.add({id: role.id});
        user.save(function(err){
          if (err) return cb(err);
          else { return null };
        });

      });

    });
  }
  cb();

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //cb();
};
