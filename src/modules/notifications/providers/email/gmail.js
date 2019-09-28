const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve('../../../.env') });
const options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'oauth2',
    user: process.env.GMAIL_OAUTH2_USER,
    clientId: process.env.GMAIL_OAUTH2_CLIENTID,
    clientSecret: process.env.GMAIL_OAUTH2_CLIENTSECRET,
    refreshToken: process.env.GMAIL_OAUTH2_REFRESHTOKEN,
    accessToken: process.env.GMAIL_OAUTH2_ACCESSTOKEN,
  },
};

async function send(sendOpts) {
  const transport = nodemailer.createTransport(options);
  return transport.sendMail(sendOpts);
}

send({
  from: process.env.GMAIL_OAUTH2_USER,
  to: 'sahand.shok@gmail.com',
  text: 'hello',
  html: '<h1>Hello</h1>',
  subject: 'Where were you buddy these last few months?',
})
  .then(info => console.log(info))
  .catch(err => console.error(err));
