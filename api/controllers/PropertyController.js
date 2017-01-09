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
			var bed = (req.param('bed') == "") ? null : req.param('bed');
			var bath = (req.param('bath') == "") ? null : req.param('bath');
			var listPrice = (req.param('listPrice') == "") ? null : req.param('listPrice');
			var yearBuilt = (req.param('yearBuilt') == "") ? null : req.param('yearBuilt');
			var sqft = (req.param('sqft') == "") ? null : req.param('sqft');

			Property.create({
				address : req.param('address'),
				city : req.param('city'),
				state : req.param('state'),
				zip : req.param('zip'),
				bed : bed,
				bath : bath,
				listPrice : listPrice,
				yearBuilt : yearBuilt,
				sqft: sqft,
				active : req.param('active')
			}).exec(function(err, property){
				if (err) return res.serverError(err);
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
				if (err) return res.serverError(err);
				return res.view('property/editProperty', {property});
			});
		}
		else if (req.method == 'POST'){
			var bed = (req.param('bed') == "") ? null : req.param('bed');
			var bath = (req.param('bath') == "") ? null : req.param('bath');
			var listPrice = (req.param('listPrice') == "") ? null : req.param('listPrice');
			var yearBuilt = (req.param('yearBuilt') == "") ? null : req.param('yearBuilt');
			var sqft = (req.param('sqft') == "") ? null : req.param('sqft');
			Property.findOne({
				id: req.param('id')
			}).exec(function(err, property){
				if(err) return res.serverError(err);
				property.address = req.param('address');
				property.city = req.param('city');
				property.state = req.param('state');
				property.zip = req.param('zip');
				property.bed = bed;
				property.bath = bath;
				property.listPrice = listPrice;
				property.yearBuilt = yearBuilt;
				property.sqft = sqft;
				property.active = req.param('active');

				property.save(function(err, result){
					if(err) return res.json(err);
					else return res.view('home', {
						message:"Property information updated",
						status:'success'
					});
				})
			});

		}
}


};
