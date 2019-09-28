const sgMail = require('@sendgrid/mail');
const apiKey = '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';

const req = {
  to: 'sahand.shkgma',
  from: 'info@nahangz.com',
  templateId: 'd-94e8463de1f3438b87351d88bacdc733',
  dynamic_template_data: {
    subject: 'کد تأیید ایمیل',
    registrationCode: '32812',
  },
};
sgMail.setApiKey(apiKey);

async function send(request) {
  try {
    const [response] = await sgMail.send(request);
    const raw = response.toJSON();
    return {
      status: 'success',
      checkStatusId: raw && raw.headers && raw.headers['x-message-id'],
      raw,
    };
  } catch (err) {
    const requestWasSent = err.response !== undefined;
    return {
      status: 'error',
      raw: err,
      errors: err.response && err.response.body && err.response.body.errors,
    };
  }
}

send(req)
  .then(response => {
    // const data = response.toJSON();
    // console.log(data);
    // console.log('BODY', data.body);
    console.log(response);
  })
  .catch(error => {
    // console.log('Object.keys(error):\n', Object.keys(error));
    // console.log('-------');
    // console.log('error.message: \n', error.message);
    // console.log('-------');
    // console.log('error.stack: \n', error.stack);
    // console.log('-------');
    // console.log('error.response: \n', error.response);
    // console.log('--------');
    // console.log('error.response.body: \n', error.response.body);
    console.log(error);
  });

const jsonResponse = {
  statusCode: 202,
  body: undefined,
  headers: {
    server: 'nginx',
    date: 'Tue, 24 Sep 2019 16:21:30 GMT',
    'content-length': '0',
    connection: 'close',
    'x-message-id': 'J48qp90xRjq0bED-lyZ31Q',
    'access-control-allow-origin': 'https://sendgrid.api-docs.io',
    'access-control-allow-methods': 'POST',
    'access-control-allow-headers': 'Authorization, Content-Type, On-behalf-of, x-sg-elas-acl',
    'access-control-max-age': '600',
    'x-no-cors-reason': 'https://sendgrid.com/docs/Classroom/Basics/API/cors.html',
  },
  request: {
    uri: {
      protocol: 'https:',
      slashes: true,
      auth: null,
      host: 'api.sendgrid.com',
      port: 443,
      hostname: 'api.sendgrid.com',
      hash: null,
      search: null,
      query: null,
      pathname: '/v3/mail/send',
      path: '/v3/mail/send',
      href: 'https://api.sendgrid.com/v3/mail/send',
    },
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'User-agent': 'sendgrid/6.4.0;nodejs',
      Authorization: 'Bearer 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',
      'content-type': 'application/json',
      'content-length': 243,
    },
  },
};
