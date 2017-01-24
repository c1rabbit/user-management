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
				active: true,
				sort: 'primary'
			}).populate('images').exec(function(err, properties){
				if (err) return res.serverError(err);

				//get featrued properties
				Property.find({
		      feature: true
		    },{
		      city:1,
		      listPrice:1
		    }).populate('images',{
		      where: {
		        primary:true
		      },
		      limit: 1
		    }).exec(function(err, featured){
		      if (err) sails.log("[PageController/home]: " + err);
					var tempFeat = [];
					featured.forEach(function(feat){
						tempFeat.push({
							city : feat.city,
							listPrice : feat.listPrice,
							id: feat.id,
							images: feat.images
						})
					});
					//console.log(tempFeat);

					return res.view('public/home', {
						properties,
						layout : 'layout_public',
						numeral,
						featured: tempFeat
					});

		    });


			});
		}
	},
	view : function(req, res){
		if(typeof req.param('id') == 'undefined'){
			return res.view('public/home');
		}
		else{

			Property.findOne({
				id:req.param('id')
			}).populate('images').exec(function(err, prop){
				if(err) return res.serverError(err);
				return res.view('public/view', {prop});
			});

		}

	}

};
