/**
 * EmailController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sendEmail : function(req, res){

    Mailgun.sendEmail({
      to:'Calvin <mail@calvinthanh.com>',
      subject:'Test',
      text:'this is a test email'
    }, function(err){
      if (err) return res.json(err);
      return res.ok();
    });

	}

};
