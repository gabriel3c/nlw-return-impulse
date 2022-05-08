import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0279f69b4ab3f8",
    pass: "45cff39d07eaac"
  }
});

export class NodeMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'Gabriel Reinhardt <gabrielmreinhardt@gmail.com>',
      subject,
      html: body
    })
  }
}