module.exports = {


  sendEmail : function(options, done){
    var conf = sails.config;
    var api_key = conf.mailgun.api_key;
    var domain = conf.mailgun.domain;
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var from = (typeof options.from == 'undefined') ? 'No Reply <noreply@samples.mailgun.org>' : options.from;
    var to = (typeof options.to == 'undefined') ? '' : options.to;
    var subject = (typeof options.subject == 'undefined') ? '' : options.subject;
    var text = (typeof options.text == 'undefined') ? '' : options.text;

    var data = {
      from: from,
      to: to,
      subject: subject,
      text: text
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      done(err);
    });

  }

};
