enum NotificationChannel {
  email = 'email',
  sms = 'sms',
  slack = 'slack',
}
type NotificationChannelType = keyof typeof NotificationChannel;

enum NotificationPurpose {
  account_registration_code = 'account_registration_code',
  account_creation_welcome_message = 'account_creation_welcome_message',
  account_password_reset_code = 'account_password_reset_code',
  account_password_changed_message = 'account_password_change_message',
}
type NotificationPurposeType = keyof typeof NotificationPurpose;

enum NotificationProvider {
  email_gmail = 'email_gmail',
  email_sendgrid = 'email_sendgrid',
  sms_niksms = 'sms_niksms',
}
type NotificationProviderType = keyof typeof NotificationProvider;

interface NotificationRequestInterface {
  metadata?: {
    id?: string;
    userId?: string;
  };
  // email?: EmailRequestInterface;
  // sms?: SmsRequestInterface;
  // slack?: SlackRequestInterface;
  // @TODO: other channels (skype, telegram, ...)
}

interface NotificationStatusInterface {
  status: 'success' | 'error';
  channel: NotificationChannelType;
  rawResponse: any; // The raw response received from the provider
  errors?: Error[];
}

// interface SmsProviderSendResponseInterface {
//   success: boolean;
//   requestId?: string; // id of the sent request to the provider
//   msgId?: string; // id of the notification that has been sent to the user by the provider
//   raw: any;
//   errors?: any;
// }

export {
  NotificationChannel,
  NotificationChannelType,
  NotificationPurpose,
  NotificationPurposeType,
  NotificationProvider,
  NotificationProviderType,
  NotificationRequestInterface,
  NotificationStatusInterface,
};
