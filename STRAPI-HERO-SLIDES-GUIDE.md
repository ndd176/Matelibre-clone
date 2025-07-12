# Hướng dẫn Setup Strapi và tạo Hero Slides

## 🚀 Bước 1: Khởi chạy Strapi

### 1.1 Mở Terminal mới và chạy lệnh:

```bash
cd "d:\ethan-website-duydinh\matelibre-backend"
npm run develop
```

### 1.2 Đợi cho đến khi thấy thông báo:

```
✨ Strapi is running at http://localhost:1337/admin
```

## 🔧 Bước 2: Setup Admin Account (Lần đầu tiên)

### 2.1 Mở trình duyệt và truy cập:

```
http://localhost:1337/admin
```

### 2.2 Tạo tài khoản admin:

- **First name**: Your Name
- **Last name**: Last Name
- **Email**: admin@example.com
- **Password**: (mật khẩu mạnh)
- **Confirm Password**: (nhập lại mật khẩu)

### 2.3 Click "Let's start"

## 📋 Bước 3: Tạo Content Type "Hero Slide"

### 3.1 Vào Content-Type Builder:

- Sidebar trái → Content-Type Builder
- Click "Create new collection type"

### 3.2 Thông tin cơ bản:

- **Display name**: Hero Slide
- **API ID (Singular)**: hero-slide
- **API ID (Plural)**: hero-slides
- Click "Continue"

### 3.3 Tạo các fields:

#### Field 1: Title

- Click "Text" → **Short text**
- **Name**: title
- **Type**: Short text
- **Advanced Settings**:
  - ✅ Required field
  - ✅ Unique field
- Click "Add another field"

#### Field 2: Subtitle

- Click "Text" → **Short text**
- **Name**: subtitle
- **Type**: Short text
- Click "Add another field"

#### Field 3: Description

- Click "Text" → **Long text**
- **Name**: description
- **Type**: Long text
- Click "Add another field"

#### Field 4: Image

- Click "Media" → **Single media**
- **Name**: image
- **Advanced Settings**:
  - ✅ Required field
  - **Allowed types**: Images only
- Click "Add another field"

#### Field 5: CTA Text

- Click "Text" → **Short text**
- **Name**: cta_text
- **Type**: Short text
- Click "Add another field"

#### Field 6: CTA Link

- Click "Text" → **Short text**
- **Name**: cta_link
- **Type**: Short text
- Click "Add another field"

#### Field 7: Order

- Click "Number" → **Integer**
- **Name**: order
- **Advanced Settings**:
  - ✅ Required field
  - **Default value**: 1
- Click "Finish"

### 3.4 Save và Restart:

- Click "Save"
- Strapi sẽ tự động restart

## 🔑 Bước 4: Cấu hình Permissions

### 4.1 Vào Settings:

- Sidebar trái → Settings → Users & Permissions Plugin → Roles

### 4.2 Chỉnh sửa Public role:

- Click "Public"
- Scroll xuống "Hero-slide"
- Bật các permissions:
  - ✅ find (để list tất cả slides)
  - ✅ findOne (để lấy 1 slide cụ thể)
  - ✅ count (để đếm số lượng)
- Click "Save"

## 📸 Bước 5: Upload Images

### 5.1 Vào Media Library:

- Sidebar trái → Media Library
- Click "Add new assets"
- Upload các ảnh từ thư mục frontend:
  - `matelibre-clone/public/images/banner-1.webp`
  - `matelibre-clone/public/images/banner-2.webp`
  - `matelibre-clone/public/images/banner-3.webp`

## 📝 Bước 6: Tạo Hero Slides Data

### 6.1 Vào Content Manager:

- Sidebar trái → Content Manager → Hero Slide
- Click "Create new entry"

### 6.2 Tạo Slide 1:

```
Title: Innovation Meets Sustainability
Subtitle: Leading the Future
Description: We create cutting-edge solutions that respect our environment and drive positive change.
Image: [Chọn banner-1.webp từ Media Library]
CTA Text: Learn More
CTA Link: /about
Order: 1
```

- Click "Save" → "Publish"

### 6.3 Tạo Slide 2:

```
Title: Join Our Growing Team
Subtitle: Career Opportunities
Description: Be part of a dynamic team that values creativity, innovation, and professional growth.
Image: [Chọn banner-2.webp từ Media Library]
CTA Text: View Careers
CTA Link: /careers
Order: 2
```

- Click "Save" → "Publish"

### 6.4 Tạo Slide 3:

```
Title: Community Impact
Subtitle: Making a Difference
Description: Discover how we're contributing to local communities and creating lasting positive impact.
Image: [Chọn banner-3.webp từ Media Library]
CTA Text: Get Involved
CTA Link: /community
Order: 3
```

- Click "Save" → "Publish"

## 🧪 Bước 7: Test API

### 7.1 Test trong browser:

```
http://localhost:1337/api/hero-slides?populate=*&sort=order:asc
```

### 7.2 Kết quả mong đợi:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Innovation Meets Sustainability",
        "subtitle": "Leading the Future",
        "description": "We create cutting-edge solutions...",
        "cta_text": "Learn More",
        "cta_link": "/about",
        "order": 1,
        "createdAt": "2025-01-11T...",
        "updatedAt": "2025-01-11T...",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/banner_1_xxx.webp"
            }
          }
        }
      }
    }
  ]
}
```

## 🔗 Bước 8: Kết nối Frontend

### 8.1 Mở API Test Dashboard:

```
http://localhost:3002/api-test
```

### 8.2 Switch to Strapi API:

- Click button "Strapi API"
- Chờ loading
- Xem data real-time từ Strapi!

## ✅ Xác nhận thành công:

1. **Connection Status**: Màu xanh với "Connected to Strapi API"
2. **Hero Slides tab**: Hiển thị 3 slides với images
3. **No errors**: Không có thông báo lỗi

## 🐛 Troubleshooting:

### Lỗi CORS:

Nếu gặp lỗi CORS, kiểm tra file `config/middlewares.ts`:

```typescript
export default [
  'strapi::cors': {
    enabled: true,
    origin: ['http://localhost:3002', 'http://localhost:3000']
  }
]
```

### API 404:

- Kiểm tra content type đã được tạo đúng tên
- Verify permissions đã được bật
- Restart Strapi nếu cần

### Images không load:

- Kiểm tra images đã được upload vào Media Library
- Verify đường dẫn image trong populate response
