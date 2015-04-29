var nodemailer = require('nodemailer');
var util = require('util');
var pjson = require('../../package');


module.exports = function(options) {

  if (typeof options === 'object') {
    return new Supervisor(options);
  }
  console.log('supervisor => initialization error, check options format');
};

/**
 * Creates an object for exposing the Supervisor API
 *
 * @constructor
 * @param {Object} options emailFrom, emailTo, transport object instance to pass the mails to
 */

var Supervisor = function(options) {

  this.emailFrom    = options.emailFrom;
  this.emailTo      = options.emailTo;
  this.appName      = pjson ? pjson.name : '';
  this.appEnv       = process.env.NODE_ENV || ''
  this.transporter  = nodemailer.createTransport(options.transport);

}

Supervisor.prototype.init = function() {

  var _this = this;

  console.log('supervisor => initialized');

  process.on('uncaughtException', function (err) {

    console.log('supervisor => ' + err);

    var mailOptions = {
      from: _this.emailFrom,
      to: _this.emailTo,
      subject: util.format('[%s | %s] Supervisor: %s',_this.appName,_this.appEnv,err.message),
      text: err.stack
    };

    _this.transporter.sendMail(mailOptions, function(err, info) {
      if(err) {
        console.log('supervisor => send email error : %s',err);
      } else {
        console.log('supervisor => %s',JSON.stringify(info));
      }
      process.exit(1);
    });

  });
}

Supervisor.prototype.test = function() {
  this.transporter.sendMail({
    from: this.emailFrom,
    to: this.emailTo,
    subject: util.format('[%s | %s] Supervisor: %s',this.appName,this.appEnv,'test email'),
    text: 'This is a test email from supervisor'
  }, function(err, info) {
    console.log('supervisor => %s',err || info);
  })
};
