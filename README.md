# 🌐 SmartZen - Hệ Sinh Thái Thiết Bị Nhà Thông Minh & Trợ Lý AI (Dify AI)
> **Đồ Án Tốt Nghiệp Học Phần:** Trí Tuệ Nhân Tạo Trong Truyền Thông TMĐT (112189)  
> **Dự án:** AI Brand Launch Lab (A3)  
> **Thương hiệu:** SmartZen — Future Living Technology  

---

## 🌟 1. Giới Thiệu Thương Hiệu & Dự Án
**SmartZen** là thương hiệu giải pháp nhà thông minh thế hệ mới, định vị tại phân khúc hiện đại, mang hơi hướng công nghệ tương lai với ngôn ngữ thiết kế tối giản, sang trọng (kết hợp tông màu Obsidian Dark, Cyber Cyan Neon và Royal Tech Blue).

- **Slogan:** *Kiến Tạo Không Gian Sống Tương Lai - Chạm Đến Đỉnh Cao Tiện Nghi*
- **Chuẩn kết nối:** Matter over Thread, Zigbee 3.0, Apple HomeKit, Google Home.
- **Điểm nhấn đột phá:** Trợ lý ảo **AI Chatbot (Tích hợp Dify AI Engine)** có khả năng phỏng vấn nhu cầu, phân tích diện tích & ngân sách để tự động xuất **Combo tối ưu** kèm **Video mô phỏng 3D / Hướng dẫn lắp đặt tự động 4 bước**.

---

## 📂 2. Cấu Trúc Mã Nguồn Dự Án
```
Project/
├── index.html               # Trang chủ & Nền tảng E-Commerce tích hợp toàn diện
├── products.html            # Trang danh mục sản phẩm chuyên sâu & bộ lọc đa tiêu chí
├── combo.html               # Trang các combo giải pháp theo không gian sống
├── survey.html              # Trang đăng ký tư vấn & khảo sát tận nơi miễn phí
├── css/
│   ├── style.css            # Hệ thống thiết kế tương lai: Glassmorphism, Neon glow, Gradients
│   └── responsive.css       # Tối ưu giao diện mượt mà trên Mobile (375px+), Tablet, PC
├── js/
│   ├── products-data.js     # Cơ sở dữ liệu 12+ thiết bị thông minh & 4 gói combo không gian
│   ├── catalog.js           # Bộ lọc danh mục, tìm kiếm realtime, thanh trượt giá, xem nhanh modal
│   ├── cart.js              # Quản lý giỏ hàng, mã giảm giá SMARTZEN2026, thanh toán VietQR
│   ├── dify-chatbot.js      # AI Chatbot thông minh: Flow tư vấn 3 bước, mô phỏng video 3D, 8 Intent NLP, Cấu hình Dify API
│   ├── survey.js            # Xử lý form đặt lịch khảo sát tại nhà, cấp mã phiếu SRV-2026-XXXX
│   └── main.js              # Khởi tạo ứng dụng, thanh thông báo, toast notification
└── README.md                # Tài liệu hướng dẫn sử dụng & báo cáo
```

---

## 🚀 3. Hướng Dẫn Khởi Chạy Website
Website được xây dựng với công nghệ thuần **HTML5 / CSS3 / Vanilla JavaScript (ES6+)**, không đòi hỏi cài đặt môi trường phức tạp:

1. **Cách 1 (Mở trực tiếp):**
   - Click đúp vào file `index.html` hoặc nhấp chuột phải chọn **Open with Google Chrome / Safari / Edge**.
   - Hoặc gõ lệnh trong Terminal:
     ```bash
     open index.html
     ```

2. **Cách 2 (Khởi chạy bằng Live Server / Python HTTP Server nếu có):**
   - Mở Terminal tại thư mục dự án và gõ:
     ```bash
     python3 -m http.server 3000
     ```
   - Truy cập trình duyệt tại: `http://localhost:3000`

---

## 🤖 4. Tính Năng Điểm Nhấn: AI Chatbot Tư Vấn Giải Pháp (Tích Hợp Dify AI)
Nút bấm **"AI Tư Vấn 24/7 (Dify)"** nổi bật ở góc phải màn hình với hiệu ứng Radar Pulse phát sáng:

### A. Quy Trình Tư Vấn Thông Minh Tự Động (Advisor Flow):
1. **Bước 1 - Khai báo diện tích phòng:**
   - `< 45m²` (Căn hộ nhỏ / Studio)
   - `45 - 80m²` (Căn hộ 2 phòng ngủ tiêu chuẩn)
   - `80 - 130m²` (Căn hộ 3 phòng ngủ rộng)
   - `> 130m²` (Nhà phố nhiều tầng / Biệt thự)
2. **Bước 2 - Lựa chọn ngân sách:**
   - `< 10 Triệu VNĐ` (Tiết kiệm)
   - `10 - 25 Triệu VNĐ` (Tiêu chuẩn tối ưu)
   - `25 - 50 Triệu VNĐ` (Nâng cao cao cấp)
   - `> 50 Triệu VNĐ` (Flagship Luxury)
3. **Bước 3 - Xác định nhu cầu trọng tâm:**
   - `An ninh 24/7 & Cảnh báo an toàn`
   - `Giải trí & Ánh sáng Ambient chill`
   - `Robot hút bụi & Tiện nghi rảnh tay`
   - `Trọn gói All-in-One toàn căn hộ`
4. **Kết quả Đề Xuất Combo Tối Ưu:**
   - Hiển thị bảng chi tiết các thiết bị, đơn giá, tổng tiền và mức tiết kiệm.
   - Nút **"🛒 Thêm Vào Giỏ"** chỉ với 1 click.
5. **Video / Mô Phỏng Lắp Đặt Tự Động (DIY Video Simulator):**
   - Bộ trình chiếu tương tác 4 bước có nút Play/Pause (▶ / ❚❚) và chuyển bước:
     * *Bước 1:* Cấp nguồn & đồng bộ Matter Core Hub Ultra.
     * *Bước 2:* Gắn cảm biến mmWave & Khóa cửa FaceID Pro.
     * *Bước 3:* Đấu nối công tắc cảm ứng & ray rèm tự động SilentCurtain.
     * *Bước 4:* Quét mã QR Matter trên app SmartZen trong 30 giây.

### B. Bộ Xử Lý 8 Ý Định Hội Thoại Chuẩn Brand Truth Pack (Chương 4 - Báo Cáo A3):
1. **Tư vấn diện tích & combo:** Gợi ý gói thiết bị phù hợp từng mặt bằng.
2. **Báo giá & Khuyến mãi:** Cung cấp mã `SMARTZEN2026` giảm 10%, miễn phí thi công.
3. **Kỹ thuật & Tự lắp đặt:** Hướng dẫn sơ đồ điện line L không cần dây nguội N.
4. **Đặt lịch kỹ sư khảo sát:** Tự động điều hướng đến form khảo sát tận nhà.
5. **Chính sách bảo hành:** Cam kết 24 tháng 1 đổi 1 tận nơi, đổi trả 30 ngày.
6. **Handoff (Kết nối người thật):** Cung cấp Hotline 1900 8899 & Zalo kỹ thuật viên trực tiếp.
7. **Thương hiệu & Tiêu chuẩn:** Chứng nhận bảo mật phần cứng AES-256 & ISO.
8. **Khả năng tương thích:** Tương thích Apple HomeKit, Google Home, Siri tiếng Việt.

### C. Tích Hợp Dify AI Thực Tế (Tab "Cấu Hình Dify API"):
- Bấm vào biểu tượng ⚙️ (Cài đặt) trên thanh tiêu đề Chatbot để nhập:
  - **Dify API Base URL:** (Ví dụ: `https://api.dify.ai/v1`)
  - **Dify API Key:** (Ví dụ: `app-xxxxxxxxxxxxxxxx`)
  - **Bật toggle "Kích hoạt Dify Live API"** để gọi trực tiếp tới Dify Workflow của bạn!

---

## 🛒 5. Giỏ Hàng, Thanh Toán & Khảo Sát Tận Nhà
1. **Giỏ hàng trượt (Sliding Drawer):**
   - Tăng/giảm số lượng sản phẩm, tự động tính tổng tiền.
   - Áp dụng mã giảm giá: nhập `SMARTZEN2026` hoặc `VIPZEN` (giảm 15%).
2. **Thanh toán đa phương thức & Quét mã VietQR:**
   - Tạo mã đơn hàng độc quyền `SZ-XXXXXX`.
   - Sinh mã QR VietQR chuẩn ngân hàng (VietinBank / MBBank) kèm nội dung chuyển khoản tự động.
   - Hỗ trợ MoMo và COD nhận hàng kiểm tra mới thanh toán.
3. **Form Đặt Lịch Khảo Sát & Tư Vấn Tận Nhà (Survey Booking):**
   - Nhập thông tin căn hộ, chọn ngày và khung giờ (Sáng / Chiều / Tối).
   - Xuất mã phiếu hẹn `SRV-2026-XXXX`.
   - Lưu trữ lịch hẹn cục bộ và cam kết kỹ sư có mặt sau 2 giờ.

---
*Phát triển bởi nhóm sinh viên đề tài AI Brand Launch Lab - Chúc các bạn bảo vệ đồ án thành công rực rỡ!*
