import { NotificationChannelType } from '../notification.types';

interface NotificationProviderResponseInterface {
  status: 'success' | 'error';
  providerGeneratedRequestId?: string;
  providerGeneratedNotificationId?: string;
  channel: NotificationChannelType;
  rawResponse: any; // The raw response received from the provider
  errors?: Error[];
}
interface NotificationRequestMetadataInterface {
  id?: string;
  userId?: string;
}

interface EmailNotificationRequestInterface {
  from: string;
  to: string;
  subject: string;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    contentType: string;
    filename: string;
    content: string | Buffer;
  }>;
  headers?: { [key: string]: string | number | boolean };
}

interface SmsNotificationRequestInterface {
  to: string;
  text: string;
  sendOn?: string;
  id?: string;
}

interface SlackNotificationRequestInterface {
  webhookUrl?: string;
  text: string;
  unfurl_links?: boolean;
  attachments?: Array<{
    fallback?: string;
    color?: string;
    pretext?: string;
    author_name?: string;
    author_link?: string;
    author_icon?: string;
    title?: string;
    title_link?: string;
    text?: string;
    fields?: Array<{
      title?: string;
      value?: string;
      short?: boolean;
    }>;
    actions?: Array<{
      type: 'button';
      text: string;
      url: string;
      style?: 'primary' | 'danger';
    }>;
    image_url?: string;
    thumb_url?: string;
    footer?: string;
    footer_icon: string;
    ts?: number;
  }>;
}

export {
  EmailNotificationRequestInterface,
  NotificationRequestMetadataInterface,
  SlackNotificationRequestInterface,
  SmsNotificationRequestInterface,
  NotificationProviderResponseInterface,
};
