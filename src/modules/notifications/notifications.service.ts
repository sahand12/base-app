// import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const TEST_ACCOUNT = 'nahang.me@gmail.com';

// @Injectable()
export class NotificationsService {
  private initialized: boolean;
  private testAccount: any;
  private transporter: any;

  constructor() {
    this.initialized = false;
  }

  async sendEmail(options: {
    from: string; // The email address of the sender
    to: string; // Comma separated list or an array of recipients email addresses that will appear on the To: field
    subject: string; // The subject of the email
    text: string; // The plaintext version of the message as a unicode string, Buffer, stream or an attachment like object
    html: string; // The HTML version of the message as an unicode string, Buffer, Stream or an attachment-like object
    attachments?: any; // An array of attachment objects. attachments can be used for embedding images as well.
  }): Promise<any> {
    await this.init();
    return this.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }

  async sendSms(): Promise<any> {
    await this.init();
  }

  async init(): Promise<void> {
    if (this.initialized === false) {
      this.testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: this.testAccount.user, // generated ethereal user
          pass: this.testAccount.pass, // generated ethereal password
        },
      });
    }
    return;
  }
}

const instance = new NotificationsService();
instance
  .sendEmail({
    from: 'nahangz.com@gmail.com',
    to: 'sahand.shok@gmail.com',
    subject: 'this is a first test',
    text: 'your registration code: 812341',
  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
