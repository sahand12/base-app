import {
  NotificationProviderResponseInterface,
  SmsNotificationRequestInterface,
} from './notification-request';

type SmsProviderType =
  | { type: 'logger' }
  | {
      type: 'custom';
      id: string;
      send(req: SmsNotificationRequestInterface): Promise<NotificationProviderResponseInterface>;
    }
  | {
      type: 'niksms';
      username: string;
      password: string;
    };

export { SmsProviderType };
