/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any admin
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  User.findOne({
    id:req.session.me
  }).populate('roles')
  .exec(function(err, user){
    if(err || typeof user == 'undefined') {
      sails.log.warn("[policy/isAdmin]: failed");
      return res.forbidden();
    }
    if(user.isAdmin()){
      return next();
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action.');
  });


};
