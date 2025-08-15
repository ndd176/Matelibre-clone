import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Cấu hình email transporter với connection pooling
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // duydinh.forfun@gmail.com
    pass: process.env.EMAIL_PASS, // App Password từ Google
  },
  pool: true, // Sử dụng connection pooling để tăng hiệu suất
  maxConnections: 5, // Tối đa 5 kết nối đồng thời
  maxMessages: 100, // Tối đa 100 message per connection
  tls: {
    rejectUnauthorized: false
  }
});

// Danh sách người nhận email
const EMAIL_RECIPIENTS = [
  // 'hr@ethanecom.com',           // Email HR chính
  'dinhduyn3@gmail.com',
  'duydinh.forfun@gmail.com'    // Email backup/admin
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Lấy thông tin từ form
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string;
    const cvFile = formData.get('cvFile') as File;

    // Validate dữ liệu
    if (!fullName || !email || !phone || !position || !cvFile) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin và đính kèm CV' },
        { status: 400 }
      );
    }

    // Kiểm tra file PDF
    if (cvFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Chỉ chấp nhận file PDF' },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (max 5MB)
    if (cvFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File CV không được vượt quá 5MB' },
        { status: 400 }
      );
    }

    // Tạo thư mục uploads nếu chưa có
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Thư mục đã tồn tại hoặc lỗi tạo thư mục
      console.log('Uploads directory handling:', error);
    }

    // Lưu file CV
    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `CV_${fullName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);

    // Template email HTML
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
          🌱 Đơn ứng tuyển mới từ ${fullName}
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Thông tin ứng viên:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #2c5530; width: 30%;">Họ tên:</td>
              <td style="padding: 8px;">${fullName}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold; color: #2c5530;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #2c5530;">Số điện thoại:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold; color: #2c5530;">Vị trí ứng tuyển:</td>
              <td style="padding: 8px;">${position}</td>
            </tr>
          </table>
        </div>

        ${message ? `
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2c5530;">
          <h4 style="color: #2c5530; margin-top: 0;">Thông điệp từ ứng viên:</h4>
          <p style="margin-bottom: 0; line-height: 1.6;">${message}</p>
        </div>
        ` : ''}

        <div style="background-color: #2c5530; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; text-align: center;">
            📎 CV đã được đính kèm trong email này
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>Email được gửi tự động từ hệ thống tuyển dụng Ethan</p>
          <p>Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
        </div>
      </div>
    `;

    // Gửi email song song cho tất cả người nhận để tăng tốc
    const emailPromises = EMAIL_RECIPIENTS.map(async (recipient) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: `Ethan ứng tuyển - ${fullName} (${position})`,
        html: emailHTML,
        attachments: [
          {
            filename: fileName,
            path: filePath,
            contentType: 'application/pdf'
          }
        ]
      };

      return transporter.sendMail(mailOptions);
    });

    // Chờ tất cả email được gửi
    const emailResults = await Promise.allSettled(emailPromises);
    
    // Kiểm tra kết quả gửi email
    const successCount = emailResults.filter(result => result.status === 'fulfilled').length;
    const failedEmails = emailResults
      .map((result, index) => ({ result, email: EMAIL_RECIPIENTS[index] }))
      .filter(({ result }) => result.status === 'rejected')
      .map(({ email }) => email);

    console.log(`✅ Gửi thành công ${successCount}/${EMAIL_RECIPIENTS.length} email`);
    
    if (failedEmails.length > 0) {
      console.log('❌ Gửi thất bại:', failedEmails);
    }

    // Trả về kết quả
    if (successCount > 0) {
      return NextResponse.json(
        { 
          message: `CV đã được gửi thành công đến ${successCount} địa chỉ email!`,
          details: {
            success: successCount,
            total: EMAIL_RECIPIENTS.length,
            failed: failedEmails
          }
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Không thể gửi email đến bất kỳ địa chỉ nào. Vui lòng thử lại.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Lỗi khi gửi CV:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi CV. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
