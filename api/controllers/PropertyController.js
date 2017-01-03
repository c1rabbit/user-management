/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listProperties : function(req, res){
		var active;
		if (typeof req.param('active') == 'undefined') {
			active = true;
		}
		else{
			active = (req.param('active') == 'false')? false : true;
		}
		Property.find({
			active:active
		}).exec(function(err, properties){
			if (err) return res.err(err);
			return res.view('property/listProperties',{properties});
		});
	},
	addProperty : function(req, res){
		if(req.method == 'GET'){
			return res.view('property/addProperty');
		}
		else if(req.method=='POST'){
			Property.create({
				address : req.param('address'),
				city : req.param('city'),
				state : req.param('state'),
				zip : req.param('zip'),
				active : req.param('active')
			}).exec(function(err, property){
				if (err) return res.err(error);
				sails.log.info('New Property added: ');
				return res.view('home', {
					message:'New Property added successfully',
					status:'success'
				});
			});
		}
	},
	editProperty: function(req, res){
		if(req.method == 'GET'){
			Property.findOne({
				id: req.param('id')
			}).exec(function(err, property){
				if (err) return res.err(err);
				return res.view('property/editProperty', {property});
			});
		}
		else if (req.method == 'POST'){
			Property.findOne({
				id: req.param('id')
			}).exec(function(err, property){
				if(err) return res.err(err);
				property.address = req.param('address');
				property.city = req.param('city');
				property.state = req.param('state');
				property.zip = req.param('zip');
				property.active = req.param('active');

				property.save(function(err, result){
					if(err) return res.err(error);
					else return res.view('home', {
						message:"Property information updated",
						status:'success'
					});
				})
			});

		}
}


};
