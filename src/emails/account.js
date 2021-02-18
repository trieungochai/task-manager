const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Goal: Pull JWT secret and database URL into env vars
// 1. Create 2 new env vars: JWT_SECRET and MONGODB_URL
// 2. Setup values for each in the development env files
// 3. Swap out three hardcoded values

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