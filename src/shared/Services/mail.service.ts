import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { configService } from './config.service';
import { MailSenderBody } from '../Types/mail-sender-body';
import { getTemplatesDir } from '../Helpers/get-templates-dir';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: configService.get('SMTP_SERVICE'),
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendVerificationMail(body: MailSenderBody): Promise<void> {
    try {
      const html = await ejs.renderFile(
        getTemplatesDir() + 'verification.ejs',
        {
          fullName: body.receiverName,
          verificationAddress: body.body,
        },
      );

      const mailOptions = {
        from: configService.get('SMTP_MAIL'),
        to: body.receiverEmail,
        subject: body.subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
