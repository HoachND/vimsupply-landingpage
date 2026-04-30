# Hướng dẫn triển khai Google Apps Script cho VimSupply

Dưới đây là đoạn mã Google Apps Script hoàn chỉnh để nhận dữ liệu từ Website, lưu vào Google Sheets và tự động gửi Email Chào mừng Đa ngôn ngữ (Anh/Việt) cho khách hàng.

## 1. Cách thiết lập Google Sheets

1. Tạo một File Google Sheets mới (Ví dụ: `Data Customer_VimSupply`).
2. Ở hàng đầu tiên (Hàng 1), tạo các cột theo thứ tự sau để dễ quản lý:
   - **Cột A:** `Thời gian`
   - **Cột B:** `Họ và Tên`
   - **Cột C:** `Số điện thoại`
   - **Cột D:** `Email`
   - **Cột E:** `Sản phẩm quan tâm`
   - **Cột F:** `Ghi chú`
   - **Cột G:** `Nguồn khách hàng`

## 2. Dán mã code Google Apps Script

1. Trong file Google Sheets, chọn menu **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
2. Xóa đoạn code cũ đi và dán toàn bộ đoạn code dưới đây vào:

```javascript
function doPost(e) {
  try {
    // 1. Kết nối với Sheet hiện tại
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Parse dữ liệu JSON nhận được từ Vercel API
    var data = JSON.parse(e.postData.contents);
    
    var name = data.name || "Không có tên";
    var phone = data.phone || "Không có SĐT";
    var email = data.email || "";
    var productType = data.productType || "Chưa chọn";
    var note = data.note || "";
    var language = data.language || "vi"; // Mặc định là tiếng Việt
    var source = data.source || "VimSupply B2B Landing Page";
    var timestamp = new Date();
    
    // 3. Ghi dữ liệu vào Google Sheets theo đúng thứ tự cột
    sheet.appendRow([
      timestamp, 
      name, 
      phone, 
      email, 
      productType, 
      note, 
      source
    ]);
    
    // 4. Nếu khách hàng có để lại Email, gửi Email Auto-Reply
    if (email) {
      sendAutoReplyEmail(email, name, language);
    }
    
    // 5. Trả về phản hồi thành công cho API
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Đã lưu data thành công"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Xử lý lỗi nếu có
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm gửi Email Đa Ngôn Ngữ
function sendAutoReplyEmail(recipientEmail, name, language) {
  var subject = "";
  var htmlBody = "";
  
  // -- CẤU HÌNH GIAO DIỆN EMAIL THEO NGÔN NGỮ --
  if (language === 'en') {
    // Giao diện Email Tiếng Anh
    subject = "VimSupply - Quotation Request Received";
    htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0047AB; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">VimSupply B2B</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #0047AB; margin-top: 0;">Dear ${name},</h2>
          <p>Thank you for your interest in the products and services of <b>VimSupply</b> (A brand under VIMGROUP).</p>
          <p>We have successfully received your quotation request for industrial materials. Our consulting team will contact you via your provided phone number within the next <b>2 working hours</b> to provide detailed support and the most competitive wholesale pricing.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://m.me/vimsupply" style="background-color: #006AFF; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              💬 Chat with us on Messenger
            </a>
          </div>

          <p><b>VimSupply Contact Information:</b></p>
          <ul style="list-style-type: none; padding-left: 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <li style="margin-bottom: 8px;">📞 Hotline: <b>0974.516.670</b></li>
            <li style="margin-bottom: 8px;">💬 Zalo/WhatsApp: <a href="https://zalo.me/0974516670" style="color: #4DA6FF; text-decoration: none;">+84 974 516 670</a></li>
            <li>🌐 Website: <a href="https://b2b.vimgroup.vn" style="color: #4DA6FF; text-decoration: none;">b2b.vimgroup.vn</a></li>
          </ul>
          <br>
          <p>Best regards,<br><b style="color: #0047AB;">VimSupply B2B Team</b></p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          © ${new Date().getFullYear()} VimSupply — A VIMGROUP Brand. All rights reserved.
        </div>
      </div>
    `;
  } else {
    // Giao diện Email Tiếng Việt
    subject = "VimSupply - Đã nhận yêu cầu báo giá";
    htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0047AB; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">VimSupply B2B</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #0047AB; margin-top: 0;">Kính chào ${name},</h2>
          <p>Cảm ơn Quý khách đã quan tâm đến vật tư và dịch vụ của <b>VimSupply</b> (Thương hiệu thuộc hệ sinh thái Tập đoàn VIMGROUP).</p>
          <p>Chúng tôi đã nhận được yêu cầu tư vấn báo giá của Quý khách. Đội ngũ chuyên viên của VimSupply sẽ liên hệ lại qua số điện thoại Quý khách đã cung cấp trong vòng <b>2 giờ làm việc</b> tiếp theo để hỗ trợ chi tiết và mang đến chính sách giá sỉ ưu đãi nhất.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://m.me/vimsupply" style="background-color: #006AFF; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              💬 Nhắn tin trực tiếp qua Messenger
            </a>
          </div>

          <p><b>Thông tin liên hệ VimSupply:</b></p>
          <ul style="list-style-type: none; padding-left: 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <li style="margin-bottom: 8px;">📞 Hotline trực tiếp: <b>0974.516.670</b></li>
            <li style="margin-bottom: 8px;">💬 Chat Zalo 24/7: <a href="https://zalo.me/0974516670" style="color: #4DA6FF; text-decoration: none;">0974.516.670</a></li>
            <li>🌐 Website chính thức: <a href="https://b2b.vimgroup.vn" style="color: #4DA6FF; text-decoration: none;">b2b.vimgroup.vn</a></li>
          </ul>
          <br>
          <p>Trân trọng,<br><b style="color: #0047AB;">Đội ngũ VimSupply B2B</b></p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          © ${new Date().getFullYear()} VimSupply — Thương hiệu của VIMGROUP. Mọi quyền được bảo lưu.
        </div>
      </div>
    `;
  }
  
  // Gửi Email
  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    htmlBody: htmlBody,
    name: "VimSupply B2B"
  });
}
```

## 3. Cách triển khai (Deploy) để lấy Link Webhook

1. Ấn nút **Save** (Lưu dự án).
2. Ấn nút **Deploy (Triển khai)** góc trên bên phải -> Chọn **New deployment (Triển khai mới)**.
3. Chỉnh **Select type (Loại)** bằng cách bấm vào biểu tượng bánh răng -> Chọn **Web app (Ứng dụng web)**.
4. Cấu hình quyền truy cập:
   - *Execute as (Thực thi dưới dạng):* **Me (Tôi)**
   - *Who has access (Ai có quyền truy cập):* **Anyone (Bất kỳ ai)**
5. Ấn **Deploy (Triển khai)**.
6. *Quan trọng:* Google sẽ yêu cầu Cấp quyền truy cập (Authorize access). Ấn Review Permissions, chọn tài khoản Gmail, chọn **Advanced (Nâng cao)** -> **Go to... (unsafe)** -> **Allow (Cho phép)**.
7. Bạn sẽ nhận được một đường link **Web app URL**. Copy đường link này.
8. Truy cập Vercel -> Vào Settings của Project `vimsupply-landing` -> Tab **Environment Variables**.
9. Thêm biến `GAS_WEBHOOK_URL` và dán đường link vừa copy vào giá trị. Build lại dự án (Redeploy) trên Vercel.
