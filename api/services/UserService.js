module.exports = {

  getUserById : function(options, done){
    User.findOne({
      id: options.id
    }).populate('roles').exec(function(err, user){
      if(err) {
        sails.log.error("User Service: " + err )
        return res.view('error', {err} );
      }
      else if(user.length == 0){
        return res.view('error', {err: "User not found"});
      }
      else{
        sails.log.info("[UserService.getUserById]");
        return done(err, user);
      }
    });
  },
  getAllRoles : function(options, done){
    Role.find().exec(function(err,roles){
      if(err) return res.view('error', {err: "Roles not found"});
      sails.log.info("[UserService.getAllRoles]");
      //sails.log.info(roles);
      return done(err, roles);
    });
  }

};
