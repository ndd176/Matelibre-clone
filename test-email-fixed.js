// Test email configuration
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'duydinh.forfun@gmail.com',
    pass: 'gaouwjgihmzquutj', // App Password thật từ Google
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function testEmail() {
  try {
    console.log('🧪 Testing email configuration...');
    
    const info = await transporter.sendMail({
      from: 'duydinh.forfun@gmail.com',
      to: 'duydinh.forfun@gmail.com',
      subject: 'Test Email từ Ethan Website',
      html: `
        <h2>🎉 Test Email Thành Công!</h2>
        <p>Nếu bạn nhận được email này, cấu hình email đã hoạt động.</p>
        <p>Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
      `,
    });

    console.log('✅ Email test thành công!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email test thất bại:', error);
  }
}

testEmail();
