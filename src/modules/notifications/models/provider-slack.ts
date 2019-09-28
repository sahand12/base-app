import {
  NotificationProviderResponseInterface,
  SlackNotificationRequestInterface,
} from './notification-request';

type SlackProviderType =
  | {
      type: 'logger';
    }
  | {
      type: 'custom';
      id: string;
      send(req: SlackNotificationRequestInterface): Promise<NotificationProviderResponseInterface>;
    }
  | {
      type: 'webhook';
      webhookUrl?: string;
    };

export { SlackProviderType };
