// Test API endpoint trực tiếp
const FormData = require('form-data');
const fs = require('fs');

async function testAPI() {
  try {
    console.log('🧪 Testing CV submission API...');
    
    // Tạo một file PDF giả để test
    const pdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000173 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n253\n%%EOF');
    fs.writeFileSync('test-cv.pdf', pdfContent);
    
    // Tạo FormData
    const formData = new FormData();
    formData.append('fullName', 'Test User API');
    formData.append('email', 'test@example.com');
    formData.append('phone', '0123456789');
    formData.append('position', 'Frontend Developer');
    formData.append('message', 'Test message từ API call trực tiếp');
    formData.append('cvFile', fs.createReadStream('test-cv.pdf'), {
      filename: 'test-cv.pdf',
      contentType: 'application/pdf'
    });

    const response = await fetch('http://localhost:3000/api/submit-cv', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });

    const result = await response.json();
    
    console.log('📤 Response status:', response.status);
    console.log('📄 Response body:', result);

    // Xóa file test
    fs.unlinkSync('test-cv.pdf');
    
    if (response.ok) {
      console.log('✅ API test thành công!');
    } else {
      console.log('❌ API test thất bại!');
    }
    
  } catch (error) {
    console.error('❌ API test error:', error);
  }
}

// Import fetch cho Node.js
global.fetch = require('node-fetch');
testAPI();
