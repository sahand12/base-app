import * as sgMail from '@sendgrid/mail';

// Set credentials
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function send(request) {
  try {
    const [response] = await sgMail.send(request);
    const raw = response.toJSON();
    return {
      status: 'success',
      providerGeneratedId: raw && raw.headers && raw.headers['x-message-id'],
      raw,
    };
  } catch (err) {
    return {
      status: 'error',
      raw: err,
      errors: err.response && err.response.body && err.response.body.errors,
    };
  }
}

send.provider = 'EMAIL_SENDGRID';

export { send };

// error shape: (If the request was successfully received by the sendgrid server)
// Error{stack, code, message, response: {headers: object, body: object}}
// error.response.body.errors shape:
// [{message, field, help}]
