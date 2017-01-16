/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home : function(req, res){
		var numeral = require('numeral');
		if (typeof req.session.me != 'undefined'){
			return res.view('home');
		}else{
			Property.find({
				active: true
			}).populate('images', {
				where: {
					primary: true
				}
			}).exec(function(err, properties){
				return res.view('public/home', {
					properties,
					layout : 'layout_public',
					numeral
				});
			});
		}
	}

};
