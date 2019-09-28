import { NotificationPurpose } from '../../notification.types';
import * as util from 'util';

const shared = {
  BRAND_NAME: 'بازی نهنگز',
  CONFIRMATION_CODE: 'کد تایید',
};

const smsTemplates = {
  [NotificationPurpose.account_creation_welcome_message]: {
    format() {
      return '';
    },
  },
  [NotificationPurpose.account_password_changed_message]: {
    format() {
      return '';
    },
  },
  [NotificationPurpose.account_password_reset_code]: {
    format() {
      return '';
    },
  },
  [NotificationPurpose.account_registration_code]: {
    format(code) {
      return util.format('%s\n%s: %d', shared.BRAND_NAME, shared.CONFIRMATION_CODE, code);
    },
  },
};

export { smsTemplates };
