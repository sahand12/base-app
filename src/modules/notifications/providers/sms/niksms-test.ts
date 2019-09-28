import { send } from './niksms';
import { smsTemplates } from '../../templates/sms';
import { NotificationPurpose } from '../../notification.types';

const text = smsTemplates[NotificationPurpose.account_registration_code].format('82124');

send({ to: '09123017212', text, textId: '39u9287897wer' })
  .then(console.log)
  .catch(console.log);
