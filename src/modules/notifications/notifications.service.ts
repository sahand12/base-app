import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const TEST_ACCOUNT = 'nahang.me@gmail.com';

@Injectable()
export class NotificationsService {
  private testAccount: any;
  private transporter: any;

  constructor() {
    this.init();
  }
  async sendEmail(options: {from: string, to: string, subject: string, text?: string, html?: string}) {
    await this.init();
  }

  sendSms() {}

  async init() {
    this.testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: 'smtp.etheral.email',
      port: 587,
      secure: false,
      auth: {
        user: this.testAccount.user,
        pass: this.testAccount.pass,
      }
    });
  }
}
