var nodemailer = require('nodemailer');
// var pjson = require()

var Supervisor = function(options) {

  var emailFrom  = options.emailFrom;
  var emailTo    = options.emailTo;
  // var transporter = nodemailer.createTransport(options.transport);

  var _init = function() {

    process.on('uncaughtException', function (err) {

      console.log('supervisor => ' + err);

      var mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: 'Supervisor: ' + err.message,
        text: err.stack
      };

    //   mailqueue.addPlain(err.stack, 'help@kindynow.com', err.message, function(err) {
    //     if(err) {
    //       console.log(err);
    //     }
    //     process.exit(1);
    //   });
    // });
    });
  }
  /*
   * Expose public API calls
   */

  this.init   = _init;

  return this;
};
