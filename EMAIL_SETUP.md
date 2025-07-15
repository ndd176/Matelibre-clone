# 📧 Hướng dẫn cấu hình Gmail cho tính năng nộp CV

## 🔑 Tạo App Password cho Gmail

1. **Bật 2-Step Verification:**
   - Đi tới: https://myaccount.google.com/security
   - Tìm "2-Step Verification" và bật nó

2. **Tạo App Password:**
   - Đi tới: https://myaccount.google.com/apppasswords
   - Chọn "Mail" và thiết bị/ứng dụng
   - Google sẽ tạo ra một mật khẩu 16 ký tự

3. **Cập nhật .env.local:**
   ```bash
   EMAIL_USER=duydinh.forfun@gmail.com
   EMAIL_PASS=abcd_efgh_ijkl_mnop  # App Password từ Google
   ```

## 🚀 Test tính năng

1. **Khởi động server:**
   ```bash
   npm run dev
   ```

2. **Truy cập trang careers:**
   - http://localhost:3000/careers

3. **Test nộp CV:**
   - Click nút "🌱 Ứng tuyển" trên bất kỳ vị trí nào
   - Điền thông tin và upload file PDF
   - Kiểm tra email duydinh.forfun@gmail.com

## 📁 Cấu trúc file

- `/src/app/api/submit-cv/route.ts` - API xử lý upload và gửi email
- `/src/components/CVSubmissionForm.tsx` - Form nộp CV
- `/uploads/` - Thư mục lưu CV (tự động tạo)
- `/.env.local` - Cấu hình email

## 🔒 Bảo mật

- File CV được lưu trong `/uploads/` và không commit lên Git
- App Password riêng biệt, không dùng mật khẩu Gmail chính
- Validation file PDF và giới hạn 5MB

## 📧 Format email gửi đi

**Subject:** Ethan ứng tuyển [Họ tên]
**To:** duydinh.forfun@gmail.com
**Nội dung:** Thông tin ứng viên được format đẹp với HTML
**Attachment:** File CV PDF

## 🛠️ Troubleshooting

1. **Lỗi authentication:**
   - Kiểm tra App Password đã đúng chưa
   - Đảm bảo 2-Step Verification đã bật

2. **Lỗi upload file:**
   - Kiểm tra thư mục `/uploads/` có quyền write
   - File phải là PDF và < 5MB

3. **Email không gửi được:**
   - Kiểm tra kết nối internet
   - Verify EMAIL_USER và EMAIL_PASS trong .env.local
