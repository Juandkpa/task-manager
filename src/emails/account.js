const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const from = 'juandkpa@gmail.com';

const sendWelcomeEmail = (email, name) => {
    return sgMail.send({
        to: email,
        from,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancelationEmail = (email, name) => {
    return sgMail.send({
        to: email,
        from,
        subject: ':( Please stay with US',
        text: `This is your cancelation Email ${name}, Why did you go?`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};