import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // to SMTP service
  auth: {
    user: process.env.EMAIL_USER, //here is the env for sender email address
    pass: process.env.EMAIL_PASS, //here is the env for sender password for email account
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}