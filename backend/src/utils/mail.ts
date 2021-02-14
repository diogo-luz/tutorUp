import * as nodemailer from 'nodemailer';

export default async function sendEmail(email: string, html: string) {
  const mailOptions = {
    from: 'tutoruppt@gmail.com', // O mail da empresa
    to: email,
    subject: 'Recuperação de palavra-passe. - TutorUp',
    html,
  };

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIl_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const info: any = await transporter.sendMail(mailOptions);

  return `Message sent: ${info.messageId}`;
}
