import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import smsProvider from './providers/sms';
import emailProvider from './providers/email';
import { User } from '../users/user.entity';

@Injectable()
class NotificationService {
  private emailProvider;
  private smsProvider;

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
  async send(purpose, request, toWhom: User) {
    const { sms, email } = request;
    if (typeof sms === 'object') {
      return this._sendSms(purpose, request, toWhom);
    } else if (typeof email === 'object') {
      return this._sendEmail(purpose, request, toWhom);
    }
  }

  async _sendSms(purpose, request, toWhom) {
    const { text, to } = request;
    const notification = new Notification();
    notification.purpose = purpose;
    notification.user = toWhom;
    notification.channel = 'sms';
    notification.provider = this.smsProvider.provider;
    notification.text = text;
    notification.to = to;

    await notification.save();
    return notification;
  }

  async _sendEmail(purpose, request, toWhom) {
    const { to, text } = request;
    const notification = new Notification();
    notification.purpose = purpose;
    notification.user = toWhom;
    notification.channel = 'email';
    notification.provider = this.emailProvider.provider;
    notification.text = text || null;
    notification.to = to;

    await notification.save();
    return notification;
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
  //
  // async sendSms(
  //   purpose: NotificationPurpose,
  //   options: {
  //     message: string;
  //     to: string;
  //   },
  // ): Promise<boolean> {
  //   const notif = new Notification();
  //   notif.kind = NotificationKind.SMS;
  //   notif.purpose = purpose;
  //   notif.provider = NotificationProvider.SMS_NIKSMS;
  //   notif.to = options.to;
  //   notif.body = options.message;
  //   await notif.save();
  //
  //   const response = await this.smsTransporter.sendOneToOne(options.message, notif.id, options.to);
  //
  //   if (typeof response.data === 'object' || Array.isArray(response)) {
  //     notif.response = JSON.stringify({ statusCode: response.statusCode, data: response.data });
  //     await notif.save();
  //   } else {
  //   }
  //
  //   return { response: response.data, notification: notif };
  // }
}

export { NotificationService };
