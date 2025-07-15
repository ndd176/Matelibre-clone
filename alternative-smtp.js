// Alternative: Using a free SMTP service
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'ethereal.user@ethereal.email',
    pass: 'ethereal.pass'
  }
});

// Hoặc dùng SendGrid (miễn phí 100 emails/day)
// npm install @sendgrid/mail
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('your-sendgrid-api-key');

// Hoặc dùng Mailtrap (cho testing)
const mailtrapTransporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'your-mailtrap-user',
    pass: 'your-mailtrap-pass'
  }
});
