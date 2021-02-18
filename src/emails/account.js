const sgMail = require('@sendgrid/mail');
const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'haitn.ute@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'haitn.ute@gmail.com',
    subject: 'Sorry to see you go!',
    text: `Goodbye ${name}. I hope to see you back sometime soon.`
  });
};

// Goal: Send email to user on cancellation
// 1. Setup a new function for sending an email on cancellation
// 2. Include their name in the email and ask why they canceled
// 3. Call it just after the account is removed

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};