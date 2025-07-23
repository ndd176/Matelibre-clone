import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Cấu hình email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // duydinh.forfun@gmail.com
    pass: process.env.EMAIL_PASS, // App Password từ Google
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, subject, message } = await request.json();

    // Validate dữ liệu
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc (tên, email, chủ đề, tin nhắn)' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Địa chỉ email không hợp lệ' },
        { status: 400 }
      );
    }

    console.log('📧 Sending contact email:', {
      from: email,
      name: name,
      subject: subject
    });

    // Chuẩn bị email gửi đến admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'duydinh.forfun@gmail.com',
      subject: `Ethan Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
            📧 Tin nhắn liên hệ mới từ ${name}
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Thông tin liên hệ:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #2c5530; width: 30%;">Họ tên:</td>
                <td style="padding: 8px;">${name}</td>
              </tr>
              <tr style="background-color: #fff;">
                <td style="padding: 8px; font-weight: bold; color: #2c5530;">Email:</td>
                <td style="padding: 8px;">${email}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #2c5530;">Số điện thoại:</td>
                <td style="padding: 8px;">${phone}</td>
              </tr>
              ` : ''}
              ${company ? `
              <tr style="background-color: #fff;">
                <td style="padding: 8px; font-weight: bold; color: #2c5530;">Công ty:</td>
                <td style="padding: 8px;">${company}</td>
              </tr>
              ` : ''}
              <tr${company && phone ? ' style="background-color: #fff;"' : ''}>
                <td style="padding: 8px; font-weight: bold; color: #2c5530;">Chủ đề:</td>
                <td style="padding: 8px;">${subject}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2c5530;">
            <h4 style="color: #2c5530; margin-top: 0;">Nội dung tin nhắn:</h4>
            <div style="margin-bottom: 0; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="background-color: #2c5530; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; text-align: center;">
              💬 Hãy trả lời khách hàng sớm nhất có thể
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Email được gửi tự động từ hệ thống liên hệ Ethan</p>
            <p>Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
          </div>
        </div>
      `,
      replyTo: email // Cho phép reply trực tiếp đến email của khách hàng
    };

    // Chuẩn bị email xác nhận gửi đến khách hàng
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Cảm ơn bạn đã liên hệ với Ethan - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
            🌱 Cảm ơn bạn đã liên hệ với Ethan!
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin-top: 0;">Chào <strong>${name}</strong>,</p>
            <p>Chúng tôi đã nhận được tin nhắn của bạn với chủ đề "<strong>${subject}</strong>".</p>
            <p>Team Ethan sẽ xem xét và phản hồi bạn trong vòng <strong>24 giờ</strong>.</p>
          </div>

          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2c5530;">
            <h4 style="color: #2c5530; margin-top: 0;">Nội dung tin nhắn của bạn:</h4>
            <div style="margin-bottom: 0; line-height: 1.6; white-space: pre-wrap; font-style: italic;">${message}</div>
          </div>

          <div style="background-color: #2c5530; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">📞 Liên hệ khẩn cấp: <strong>+84 967 473 979</strong></p>
            <p style="margin: 5px 0 0 0;">📧 Email: <strong>duydinh.forfun@gmail.com</strong></p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Trân trọng,<br>Team Ethan</p>
            <p>Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
          </div>
        </div>
      `
    };

    // Gửi email đến admin
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin email sent successfully');

    // Gửi email xác nhận đến khách hàng
    await transporter.sendMail(customerMailOptions);
    console.log('✅ Customer confirmation email sent successfully');

    return NextResponse.json(
      { message: 'Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Lỗi khi gửi email liên hệ:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua số điện thoại.' },
      { status: 500 }
    );
  }
}