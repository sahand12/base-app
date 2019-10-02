import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notification } from './notification.entity';
import smsProvider from './providers/sms';
import emailProvider from './providers/email';
import { User } from '../users/user.entity';
import { NotificationPurpose } from './notification.types';

type NotificationChannelType = 'email' | 'sms';
export interface NotificationRequestInterface {
  sms?: SmsNotificationRequestInterface;
  email?: EmailNotificationRequestInterface;
}
export interface SmsNotificationRequestInterface {
  to: string;
  text: string;
  sendOn?: string;
  textId?: string;
}
export interface EmailNotificationRequestInterface {
  to: string;
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamic_template_data?: any;
}
type NotificationRequestType = SmsNotificationRequestInterface | EmailNotificationRequestInterface;

export interface NotificationProviderResponseInterface {
  status: 'success' | 'error';
  providerGeneratedId?: string;
  raw?: any;
  errors?: any[];
}

export interface NotificationResponseInterface {
  status: 'success' | 'error';
  channel: NotificationChannelType;
  notification: Notification;
}
export interface EmailNotificationResponseInterface extends NotificationResponseInterface {
  channel: 'email';
}
export interface SmsNotificationResponseInterface extends NotificationResponseInterface {
  channel: 'sms';
}

export interface NotificationProviderInterface {
  checkDelivery?(id: string): Promise<boolean>;
  send(request: NotificationRequestType): Promise<NotificationProviderResponseInterface>;
  name: string;
  channel: NotificationChannelType;
}
export interface SmsNotificationProviderInterface extends NotificationProviderInterface {
  send(request: SmsNotificationRequestInterface): Promise<NotificationProviderResponseInterface>;
  channel: 'sms';
}
export interface EmailNotificationProviderInterface extends NotificationProviderInterface {
  send(request: EmailNotificationRequestInterface): Promise<NotificationProviderResponseInterface>;
  channel: 'email';
}

@Injectable()
class NotificationService {
  private emailProvider: EmailNotificationProviderInterface;
  private smsProvider: SmsNotificationProviderInterface;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {
    this.emailProvider = emailProvider;
    this.smsProvider = smsProvider;
  }

  // 1. First create a notification and save it to the database
  // 2. Send the request to the provider
  // 3. save the result back to the notification
  async send(
    purpose: NotificationPurpose,
    request: NotificationRequestInterface,
    toWhom: User,
  ): Promise<NotificationProviderResponseInterface> {
    if (typeof request.sms === 'object') {
      return this._sendSms(purpose, request as SmsNotificationRequestInterface, toWhom);
    } else if (typeof request.email === 'object') {
      return this._sendEmail(purpose, request as EmailNotificationRequestInterface, toWhom);
    }
  }

  // @TODO: what to do when 'sendOn' is present
  async _sendSms(
    purpose: NotificationPurpose,
    request: SmsNotificationRequestInterface,
    toWhom: User,
  ): Promise<NotificationResponseInterface> {
    const { text, to } = request;
    let sendResult: NotificationProviderResponseInterface;
    const notification = new Notification();
    notification.purpose = purpose;
    notification.user = toWhom;
    notification.channel = 'sms';
    notification.provider = this.smsProvider.name;
    notification.text = text;
    notification.to = to;

    await notification.save();
    sendResult = await this.smsProvider.send({ ...request, textId: notification.id });
    if (sendResult.status === 'success') {
      return { status: 'success', channel: 'sms', notification };
    }
    return { status: 'error', channel: 'sms', notification };
  }

  async _sendEmail(purpose, request, toWhom): Promise<NotificationResponseInterface> {
    const { to, text } = request;
    let response: NotificationProviderResponseInterface;
    const notification = new Notification();
    notification.purpose = purpose;
    notification.user = toWhom;
    notification.channel = 'email';
    notification.provider = this.emailProvider.name;
    notification.text = text || null;
    notification.to = to;

    await notification.save();
    throw new Error('not implemented');
    response = await this.emailProvider.send(request);

    if (response.status === 'success') {
      return { status: 'success', channel: 'email', notification };
    }
    return { status: 'error', channel: 'email', notification };
  }

  // async sendMail(
  //   purpose: NotificationPurpose,
  //   options: {
  //     // from: string; // The email address of the sender
  //     to: string; // Comma separated list or an array of recipients email addresses that will appear on the To: field
  //     subject: string; // The subject of the email
  //     text: string; // The plaintext version of the message as a unicode string, Buffer, stream or an attachment like object
  //     html: string; // The HTML version of the message as an unicode string, Buffer, Stream or an attachment-like object
  //     attachments?: any; // An array of attachment objects. attachments can be used for embedding images as well.
  //   },
  // ): Promise<any> {
  //   const info = await this.mailTransporter.sendMail({
  //     // from: options.from,
  //     to: options.to,
  //     subject: options.subject,
  //     text: options.text,
  //     html: options.html,
  //   });
  //
  //   const notif = new Notification();
  //   notif.kind = NotificationKind.EMAIL;
  //   notif.purpose = purpose;
  //   notif.provider = NotificationProvider.EMAIL_GMAIL;
  //   notif.to = options.to;
  //   notif.messageId = (info && info.envelope && info.envelope.messageId) || null;
  //   await notif.save();
  //
  //   return { info, notification: notif };
  // }
}

export { NotificationService };
