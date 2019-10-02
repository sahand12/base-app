import * as sgMail from '@sendgrid/mail';
import {
  EmailNotificationProviderInterface,
  EmailNotificationRequestInterface,
  NotificationProviderResponseInterface,
} from '../../notification.service';

// Set credentials
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function send(
  request: EmailNotificationRequestInterface,
): Promise<NotificationProviderResponseInterface> {
  try {
    // @TODO: remove as any
    const [response] = await sgMail.send(request as any);
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

const notificationProviderSendgrid: EmailNotificationProviderInterface = {
  send,
  name: 'sendgrid',
  channel: 'email',
};

export default notificationProviderSendgrid;

// error shape: (If the request was successfully received by the sendgrid server)
// Error{stack, code, message, response: {headers: object, body: object}}
// error.response.body.errors shape:
// [{message, field, help}]
