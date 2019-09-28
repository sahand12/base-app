import {
  EmailNotificationRequestInterface,
  NotificationProviderResponseInterface,
} from './notification-request';

type EmailProviderType =
  | { type: 'logger' }
  | {
      type: 'custom';
      id: string;
      send(
        request: EmailNotificationRequestInterface,
      ): Promise<NotificationProviderResponseInterface>;
    }
  | {
      type: 'sendgrid';
      apiKey: string;
    };

export { EmailProviderType };
