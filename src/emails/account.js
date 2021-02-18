const sgMail = require('@sendgrid/mail');
const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);
sgMail.send({
  to: 'haitn.ute@gmail.com',
  from: 'haitn.ute@gmail.com',
  subject: 'This is my first creation',
  text: 'I hope this one actually get to you.'
});