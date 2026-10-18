/**
 * SmartZen E-Commerce - Product & Solution Database
 * Brand: SmartZen - Future Living Technology
 */

const SMARTZEN_PRODUCTS = [
  {
    id: "sz-nova-beam",
    name: "Đèn LED Thông Minh Ambient RGBIC SmartZen Nova Beam",
    category: "lighting",
    categoryName: "Đèn Thông Minh",
    badge: "Bán chạy nhất",
    rating: 4.9,
    reviewsCount: 148,
    price: 850000,
    originalPrice: 1150000,
    discountPercent: 26,
    stock: 45,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&auto=format&fit=crop&q=80",
    tagline: "Ánh sáng tương lai đồng bộ âm thanh & hiển thị 16 triệu màu RGBIC độc lập",
    shortDesc: "Dải LED Neon Silicon uốn dẻo thế hệ mới với chip điều khiển từng phân vùng màu, phản hồi tức thì theo nhịp điệu âm nhạc và kịch bản ngữ cảnh.",
    specs: {
      "Chuẩn kết nối": "Matter, Apple HomeKit, Google Home, WiFi 2.4GHz",
      "Số lượng màu": "16 triệu màu RGBIC đa phân vùng",
      "Chiều dài & Công suất": "5 Mét / 24W tiết kiệm điện",
      "Tuổi thọ bóng": "50.000 Giờ liên tục",
      "Chỉ số kháng nước": "IP67 chống ẩm bụi cao cấp",
      "Đặc tính nổi bật": "Đồng bộ nhịp điệu âm thanh theo thời gian thực (Microphone AI tích hợp)"
    },
    inTheBox: ["Cuộn LED Neon 5m", "Bộ nguồn Adapter 24V", "Bộ điều khiển thông minh SmartZen", "Bộ kẹp định hình góc tường", "Sách hướng dẫn sử dụng tiếng Việt"],
    features: [
      "Tương thích chuẩn quốc tế Matter & Apple HomeKit",
      "Điều khiển từng đoạn màu riêng biệt với công nghệ RGBIC độc quyền",
      "Cảm biến âm thanh AI tự động điều chỉnh hiệu ứng theo giai điệu",
      "Hẹn giờ mô phỏng bình minh đánh thức tự nhiên"
    ]
  },
  {
    id: "sz-aura-ceiling",
    name: "Đèn Trần Thông Minh SmartZen Aura Ceiling Pro 50W",
    category: "lighting",
    categoryName: "Đèn Thông Minh",
    badge: "Công nghệ mới",
    rating: 4.8,
    reviewsCount: 92,
    price: 1950000,
    originalPrice: 2450000,
    discountPercent: 20,
    stock: 28,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&auto=format&fit=crop&q=80",
    tagline: "Chiếu sáng sinh học tự nhiên, bảo vệ mắt đạt chuẩn Ra98",
    shortDesc: "Đèn ốp trần thông minh siêu mỏng 3.5cm, đổi nhiệt độ màu từ vàng ấm 2700K sang trắng tự nhiên 6500K, tích hợp đèn hắt trần Ambient dạ quang.",
    specs: {
      "Chuẩn kết nối": "Zigbee 3.0 & Bluetooth Mesh, Hub Matter",
      "Công suất": "50W (Phù hợp phòng 15 - 30m²)",
      "Nhiệt độ màu": "2700K - 6500K điều chỉnh mượt mà",
      "Chỉ số hoàn màu": "CRI Ra98 (Chuẩn studio cao cấp)",
      "Đường kính": "480mm, độ mỏng 35mm",
      "Tính năng đặc biệt": "Đèn hắt dạ quang Ambient RGB hắt ngược trần nhà"
    },
    inTheBox: ["Đèn trần Aura Pro", "Đế lắp ngàm khóa nhanh chống rơi", "Remote điều khiển Bluetooth", "Bộ ốc vít nở", "Phiếu bảo hành 24 tháng"],
    features: [
      "Ngàm khóa tháo lắp thông minh chỉ trong 10 giây",
      "Kháng côn trùng và bụi mịn đạt chuẩn IP50 kín khít",
      "Hỗ trợ điều khiển bằng giọng nói tiếng Việt qua Google Assistant & Siri",
      "Chế độ ánh trăng Moonlight dịu nhẹ 1 lumen cho giấc ngủ sâu"
    ]
  },
  {
    id: "sz-eye-360-ai",
    name: "Camera An Ninh AI 360° 4K HDR SmartZen Eye Guard",
    category: "security",
    categoryName: "Cảm Biến & An Ninh",
    badge: "Bảo mật cao",
    rating: 5.0,
    reviewsCount: 215,
    price: 1490000,
    originalPrice: 1890000,
    discountPercent: 21,
    stock: 52,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=700&auto=format&fit=crop&q=80",
    tagline: "Tầm nhìn đêm có màu starlight & chip NPU nhận diện khuôn mặt người thân",
    shortDesc: "Camera xoay 360 độ độ phân giải siêu nét 4K HDR, phân biệt chính xác người, thú cưng và vật thể lạ, kích hoạt còi báo động thông minh khi đột nhập.",
    specs: {
      "Độ phân giải": "4K Ultra HD (3840 x 2160 pixels)",
      "Góc nhìn & Xoay": "Xoay ngang 360°, dọc 115°, góc rộng 120°",
      "Tầm nhìn ban đêm": "Màu sắc Full-Color Starlight 15 mét",
      "Trí tuệ nhân tạo": "NPU AI nhận diện người thân/người lạ, tiếng trẻ em khóc",
      "Lưu trữ": "Thẻ nhớ microSD tối đa 512GB & Cloud mã hóa AES-256",
      "Đàm thoại": "Loa & Mic kép chống ồn AI 2 chiều"
    },
    inTheBox: ["Camera SmartZen Eye Guard", "Củ sạc & Cáp Type-C 3m", "Đế gắn tường/trần đa năng", "Bộ vít tắc kê", "Sách HDSD"],
    features: [
      "Màn trập vật lý tự đóng che ống kính bảo vệ quyền riêng tư",
      "Cảnh báo thông minh tức thì qua thông báo điện thoại kèm video 10 giây",
      "Còi hú báo động âm lượng 105dB kết hợp đèn chớp răn đe",
      "Không thu phí duy trì lưu trữ đám mây nội bộ"
    ]
  },
  {
    id: "sz-sentinel-radar",
    name: "Bộ Cảm Biến Hiện Diện mmWave Radar 24GHz SmartZen Sentinel",
    category: "security",
    categoryName: "Cảm Biến & An Ninh",
    badge: "Công nghệ Radar",
    rating: 4.9,
    reviewsCount: 88,
    price: 690000,
    originalPrice: 890000,
    discountPercent: 22,
    stock: 64,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&auto=format&fit=crop&q=80",
    tagline: "Cảm nhận từng nhịp thở của người trong phòng, không lo tắt đèn khi ngồi yên",
    shortDesc: "Cảm biến sóng milimet mmWave 24GHz vượt trội hoàn toàn cảm biến hồng ngoại PIR cũ, duy trì trạng thái có người ngay cả khi đang ngủ hoặc đọc sách.",
    specs: {
      "Công nghệ cảm ứng": "Radar sóng milimet tần số 24GHz FMCW",
      "Khoảng cách phát hiện": "0.3m đến 7 mét (Điều chỉnh theo phân vùng)",
      "Góc quét": "120 độ không gian",
      "Cảm biến tích hợp": "Cảm biến cường độ sáng Lux (0 - 10.000 Lux)",
      "Giao thức": "Zigbee 3.0 & Thread chuẩn Matter",
      "Nguồn điện": "Cổng cấp nguồn USB-C 5V/1A liên tục ổn định"
    },
    inTheBox: ["Cảm biến Sentinel Radar", "Đế hít nam châm xoay 360°", "Cáp USB-C bọc dù 2m", "Miếng dán 3M siêu chắc", "Sách HDSD"],
    features: [
      "Khắc phục 100% tình trạng đèn tự tắt khi người dùng ngồi làm việc",
      "Thiết lập khu vực cấm phát hiện (ví dụ quạt trần, rèm cửa rung)",
      "Kích hoạt ngữ cảnh tự động mở điều hòa, ánh sáng ngay khi bước vào phòng",
      "Tích hợp đo cường độ sáng để chỉ bật đèn khi trời tối"
    ]
  },
  {
    id: "sz-safeguard-leak",
    name: "Cảm Biến Khói, Rò Khí Gas & Cảnh Báo Ngập Nước SmartZen SafeGuard",
    category: "security",
    categoryName: "Cảm Biến & An Ninh",
    badge: "An toàn tuyệt đối",
    rating: 4.8,
    reviewsCount: 76,
    price: 550000,
    originalPrice: 720000,
    discountPercent: 24,
    stock: 40,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&auto=format&fit=crop&q=80",
    tagline: "Hộ vệ an toàn 24/7 bảo vệ tính mạng và tài sản gia đình",
    shortDesc: "Cảm biến quang điện kép phát hiện khói độc, khí methane/LPG rò rỉ và đầu dò ngập nước siêu nhạy, tự ngắt van điện tử khi có sự cố.",
    specs: {
      "Chuẩn kết nối": "Zigbee 3.0 tầm xa 100m không gian mở",
      "Độ nhạy": "Phát hiện khói nồng độ 0.1dB/m, rò rỉ nước từ 0.5mm",
      "Âm thanh còi báo": "Còi tích hợp 85dB kèm đèn LED nháy đỏ",
      "Nguồn pin": "Pin Lithium CR123A tuổi thọ lên đến 3 năm",
      "Nhiệt độ hoạt động": "-10°C đến +55°C",
      "Tiêu chuẩn": "Chứng nhận an toàn phòng cháy EN14604"
    },
    inTheBox: ["Cảm biến SafeGuard", "Đầu dò dây dài chống ngập 1m", "Pin CR123A chính hãng", "Bộ vít gắn trần", "Hướng dẫn sử dụng"],
    features: [
      "Cảnh báo tức thời qua app SmartZen và gọi điện tự động thông báo",
      "Tự động phối hợp ngắt van điện nước và ngắt aptomat phòng",
      "Pin dung lượng cao dùng 3 năm không cần thay",
      "Tự kiểm tra tình trạng cảm biến định kỳ hàng tuần"
    ]
  },
  {
    id: "sz-robovac-x10",
    name: "Robot Hút Bụi & Lau Nhà Tự Giặt Sấy Giẻ SmartZen X10 Ultra",
    category: "robot",
    categoryName: "Robot Hút Bụi",
    badge: "Flagship Đỉnh Cao",
    rating: 5.0,
    reviewsCount: 312,
    price: 13990000,
    originalPrice: 16900000,
    discountPercent: 17,
    stock: 18,
    image: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=700&auto=format&fit=crop&q=80",
    tagline: "Trạm sạc đa năng 7 trong 1: Tự gom rác 60 ngày, tự giặt nước nóng và sấy khô giẻ khí nóng 60°C",
    shortDesc: "Robot hút bụi thông minh mạnh nhất phân khúc với lực hút 8.500Pa, định vị Laser LDS LiDAR 3D Bionic tránh 108 loại vật cản, lau xoay kép đánh bay vết bẩn khô cứng.",
    specs: {
      "Lực hút tối đa": "8.500 Pa công nghệ lốc xoáy Vortex",
      "Hệ thống lau": "Lau xoay kép 180 vòng/phút kèm nén lực 10N",
      "Dung tích trạm sạc": "Túi bụi 3.2L (60 ngày), bình nước sạch 4L, bẩn 4L",
      "Công nghệ sấy giẻ": "Sấy khô khí nóng tuần hoàn 60°C diệt khuẩn 99.9%",
      "Điều hướng & Tránh cản": "AI 3D Bionic Dual Line Laser + LDS LiDAR",
      "Dung lượng pin": "5.200 mAh (Làm sạch diện tích đến 250m² một lần sạc)"
    },
    inTheBox: ["Robot SmartZen X10 Ultra", "Trạm làm sạch Omni đa năng", "2 Miếng giẻ lau xoay kháng khuẩn", "Chổi quét ven & chổi chính cao su chống rối", "Dung dịch lau sàn chuyên dụng 500ml"],
    features: [
      "Tự động nâng giẻ lau 12mm khi gặp thảm không làm ướt thảm",
      "Tự giặt giẻ bằng nước ấm 55°C làm mềm vết dầu mỡ nhà bếp",
      "Bản đồ 3D tương tác nhiều tầng, phân chia từng phòng chi tiết",
      "Camera AI truyền hình ảnh trực tiếp hỗ trợ tuần tra an ninh nhà cửa"
    ]
  },
  {
    id: "sz-robovac-slim-s5",
    name: "Robot Hút Bụi Lau Nhà Siêu Mỏng SmartZen Slim S5 (6.8cm)",
    category: "robot",
    categoryName: "Robot Hút Bụi",
    badge: "Siêu mỏng 6.8cm",
    rating: 4.7,
    reviewsCount: 84,
    price: 5490000,
    originalPrice: 6900000,
    discountPercent: 20,
    stock: 35,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80",
    tagline: "Thiết kế siêu mỏng len lỏi mọi gầm giường, sofa và kệ tủ thấp",
    shortDesc: "Robot hút bụi lau nhà tối ưu cho căn hộ chung cư từ 35 - 75m², lực hút 4.000Pa êm ái dưới 55dB, điều hướng Gyro 4.0 thông minh chống rơi cầu thang.",
    specs: {
      "Độ dày thân máy": "68mm (Chỉ 6.8cm - mỏng nhất thị trường)",
      "Lực hút": "4.000 Pa 3 cấp độ tùy chỉnh",
      "Hộp nước & Hộp bụi": "Hộp bụi 450ml, hộp nước điện tử 300ml",
      "Thời lượng pin": "Pin 3.200mAh chạy 120 phút liên tục",
      "Độ ồn": "Dưới 55dB cực kỳ êm ái không ảnh hưởng trẻ nhỏ",
      "Kết nối": "Wifi 2.4GHz điều khiển qua Smartphone"
    },
    inTheBox: ["Robot Slim S5", "Dock sạc tự động", "Adapter nguồn", "2 Bộ chổi ven dự phòng", "Khăn lau Microfiber", "HDSD tiếng Việt"],
    features: [
      "Vượt chướng ngại vật và gờ cửa 18mm nhẹ nhàng",
      "Bơm nước điện tử kiểm soát độ ẩm chống phồng rộp sàn gỗ",
      "Cảm biến chống rơi 6 điểm quanh thân máy",
      "Lọc HEPA giữ lại 99.5% phấn hoa và bụi mịn PM2.5"
    ]
  },
  {
    id: "sz-neo-lock",
    name: "Khóa Cửa Thông Minh 3D FaceID SmartZen Neo Lock Pro",
    category: "automation",
    categoryName: "Khóa & Rèm Tự Động",
    badge: "Bảo mật sinh trắc",
    rating: 4.9,
    reviewsCount: 162,
    price: 6800000,
    originalPrice: 8500000,
    discountPercent: 20,
    stock: 22,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=700&auto=format&fit=crop&q=80",
    tagline: "Nhận diện gương mặt 3D Bionic mở khóa trong 0.3s ngay cả khi trời tối",
    shortDesc: "Khóa thông minh cao cấp thân hợp kim kẽm nguyên khối, 7 phương thức mở khóa: Face ID 3D, vân tay tĩnh mạch dưới da, mật khẩu ảo, thẻ từ RFID, app SmartZen từ xa, chìa cơ và mã mở tạm thời.",
    specs: {
      "Phương thức mở khóa": "FaceID 3D, Vân tay FPC Thụy Điển, Mật mã, Thẻ từ, App, Chìa cơ",
      "Độ chính xác FaceID": "Tỷ lệ nhận diện sai dưới 0.0001% (Chống ảnh và video giả mạo)",
      "Vật liệu thân khóa": "Hợp kim kẽm đúc nguyên khối chống cắt phá",
      "Ruột khóa": "Inox 304 chuẩn C-Level cao cấp nhất",
      "Nguồn điện": "Pin sạc Lithium 5.000mAh (Dùng 8 - 10 tháng), cổng sạc khẩn cấp Type-C",
      "Tích hợp": "Chuông cửa màn hình IPS 4.0 inch đàm thoại video trực tiếp"
    },
    inTheBox: ["Bộ khóa mặt trước và sau", "Ruột khóa Inox C-Level", "2 Chìa cơ dự phòng", "2 Thẻ từ RFID mini", "Pin sạc 5.000mAh", "Bản vẽ khoan cửa tiêu chuẩn"],
    features: [
      "Camera mắt mèo góc rộng 160° chụp hình người bấm chuông gửi về app",
      "Cảnh báo khi nhập sai mật khẩu 5 lần hoặc phát hiện có kẻ cố tình cạy khóa",
      "Tạo mã PIN 1 lần hoặc mã có thời hạn cho khách và người giúp việc từ xa",
      "Tự động đóng và khóa chốt ngay khi khép cửa"
    ]
  },
  {
    id: "sz-silent-curtain",
    name: "Động Cơ Rèm Tự Động Siêu Êm SmartZen SilentCurtain Pro",
    category: "automation",
    categoryName: "Khóa & Rèm Tự Động",
    badge: "Siêu êm ái",
    rating: 4.8,
    reviewsCount: 65,
    price: 2650000,
    originalPrice: 3200000,
    discountPercent: 17,
    stock: 30,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&auto=format&fit=crop&q=80",
    tagline: "Đón ánh bình minh tự động, vận hành êm ru chỉ 20dB",
    shortDesc: "Động cơ rèm thông minh chịu tải trọng đến 60kg rèm vải 2 lớp, tích hợp pin lithium không cần kéo dây điện phức tạp, điều khiển mượt mà bằng giọng nói hoặc cử chỉ kéo nhẹ.",
    specs: {
      "Độ ồn hoạt động": "Chỉ 20dB (Êm như tiếng lá rơi)",
      "Tải trọng tối đa": "Kéo rèm nặng đến 60kg (Chiều dài ray tới 6 mét)",
      "Nguồn điện": "Pin sạc tích hợp dùng 6 tháng/lần sạc hoặc cắm nguồn 220V",
      "Chuẩn giao tiếp": "Zigbee 3.0 & Matter tương thích Apple HomeKit",
      "Vật liệu ray": "Hợp kim nhôm hàng không định hình siêu bền",
      "Tốc độ kéo": "Tùy chỉnh tốc độ mở từ 10cm/s đến 20cm/s"
    },
    inTheBox: ["Động cơ rèm SilentCurtain Pro", "Ray rèm nhôm 3 mét (Nối tùy biến)", "Dây curoa lõi thép chống giãn", "Remote cầm tay", "Bộ puly và bánh xe treo bi lăn"],
    features: [
      "Tính năng Touch-Motion: Kéo nhẹ rèm 5cm để động cơ tự động chạy hết hành trình",
      "Hẹn giờ mở rèm 30% lúc 6h30 sáng để đón ánh nắng sớm nhẹ nhàng",
      "Vẫn kéo rèm bằng tay bình thường khi cúp điện",
      "Đồng bộ đóng rèm khi kích hoạt chế độ xem phim rạp tại nhà"
    ]
  },
  {
    id: "sz-core-hub",
    name: "Bộ Trung Tâm Điều Khiển Nhà Thông Minh SmartZen Core Hub Ultra",
    category: "hub",
    categoryName: "Hub Trung Tâm",
    badge: "Trái tim hệ thống",
    rating: 5.0,
    reviewsCount: 189,
    price: 1850000,
    originalPrice: 2300000,
    discountPercent: 20,
    stock: 45,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=700&auto=format&fit=crop&q=80",
    tagline: "Hỗ trợ chuẩn kết nối tương lai Matter & Thread, vận hành ngữ cảnh Offline 100%",
    shortDesc: "Bộ não trung tâm kết nối không giới hạn mọi thiết bị trong gia đình, hỗ trợ đồng thời Matter, Zigbee 3.0, Thread, Bluetooth Mesh và WiFi băng tần kép.",
    specs: {
      "Giao thức hỗ trợ": "Matter over Thread, Zigbee 3.0, BLE 5.2, WiFi 2.4/5GHz",
      "Khả năng kết nối": "Lên tới 128 thiết bị con đồng thời",
      "Bộ vi xử lý": "Quad-core ARM Cortex-A53 1.5GHz, 1GB RAM",
      "Xử lý ngữ cảnh": "Local Automation (Vẫn hoạt động bình thường khi mất mạng Internet)",
      "Cổng kết nối": "Cổng mạng RJ45 Gigabit Ethernet + Cổng Type-C nguồn",
      "Bảo mật": "Chip mã hóa phần cứng phần cứng Hardware Security Chip"
    },
    inTheBox: ["SmartZen Core Hub Ultra", "Cáp mạng LAN dẹt Cat6", "Củ sạc & Cáp Type-C", "Sách HDSD & Mã quét Matter Setup"],
    features: [
      "Đưa toàn bộ thiết bị Zigbee vào hệ sinh thái Apple HomeKit mượt mà",
      "Phản hồi kịch bản trong 0.05 giây nhờ vi xử lý cục bộ",
      "Đèn LED đa sắc trạng thái hiển thị tình trạng mạng",
      "Sao lưu tự động cấu hình và kịch bản lên đám mây bảo mật"
    ]
  },
  {
    id: "sz-touch-switch",
    name: "Công Tắc Cảm Ứng Kính Cường Lực SmartZen Touch Switch Glass",
    category: "automation",
    categoryName: "Khóa & Rèm Tự Động",
    badge: "Thiết kế sang trọng",
    rating: 4.8,
    reviewsCount: 110,
    price: 420000,
    originalPrice: 550000,
    discountPercent: 24,
    stock: 80,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80",
    tagline: "Mặt kính cường lực vát cạnh sang trọng, cảm ứng điện dung phản hồi rung haptic",
    shortDesc: "Công tắc thông minh chuẩn âm tường chữ nhật tiêu chuẩn Việt Nam, hỗ trợ cả 2 phiên bản có dây nguội N hoặc không có dây nguội N, dễ dàng thay thế cho công tắc truyền thống.",
    specs: {
      "Số nút điều khiển": "Có sẵn phiên bản 1 nút, 2 nút, 3 nút và 4 nút",
      "Mặt kính": "Kính cường lực tràn viền vát cạnh CNC 2.5D chống trầy",
      "Công suất chịu tải": "800W / Nút cho tải đèn LED, 2000W cho tải điện trở",
      "Điện áp hoạt động": "100 - 240V AC 50/60Hz",
      "Phản hồi": "Rung nhẹ Haptic feedback kèm âm thanh click êm dịu",
      "Đèn nền": "LED Ambient ánh trăng (Xanh dương khi bật, Cam ấm khi tắt)"
    },
    inTheBox: ["Mặt công tắc SmartZen", "Tụ điện chống chớp (Cho bản ko dây N)", "2 Ốc bắt đế âm", "Sách hướng dẫn sơ đồ đấu nối"],
    features: [
      "Không cần đục phá tường, vừa khít đế âm chữ nhật Sino/Panasonic",
      "Chuyển đổi bất kỳ nút nào thành công tắc ngữ cảnh thông minh",
      "Chống nước bề mặt, thao tác an toàn ngay cả khi tay ướt",
      "Hẹn giờ đếm ngược và kiểm soát lượng điện năng tiêu thụ"
    ]
  },
  {
    id: "sz-air-purifier",
    name: "Máy Lọc Không Khí Thông Minh SmartZen PureAir AI 360°",
    category: "security",
    categoryName: "Cảm Biến & An Ninh",
    badge: "Bảo vệ sức khỏe",
    rating: 4.9,
    reviewsCount: 104,
    price: 3490000,
    originalPrice: 4250000,
    discountPercent: 18,
    stock: 25,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&auto=format&fit=crop&q=80",
    tagline: "Màng lọc HEPA H13 khử 99.97% bụi mịn PM0.3 và vi khuẩn virus trong không khí",
    shortDesc: "Máy lọc không khí thông minh tuần hoàn gió 360 độ công suất CADR 450m³/h cho phòng tới 55m², tích hợp laser đo bụi siêu mịn và ion âm khử mùi thức ăn thú cưng.",
    specs: {
      "Chỉ số làm sạch CADR": "450 m³/h (Làm sạch phòng 30m² chỉ trong 10 phút)",
      "Bộ lọc": "3 Lớp: Tiền lọc nano, HEPA H13 kháng khuẩn, Than hoạt tính xúc tác",
      "Cảm biến tích hợp": "Laser PM2.5, Nhiệt độ và Độ ẩm không khí",
      "Độ ồn ban đêm": "24dB ở chế độ Ngủ (Sleep Mode)",
      "Màn hình hiển thị": "Màn hình OLED cảm ứng hiển thị chỉ số AQI thời gian thực",
      "Kháng khuẩn": "Bộ phát ion âm Plasmacluster diệt nấm mốc"
    },
    inTheBox: ["Máy lọc không khí PureAir", "Lõi lọc 360 độ HEPA H13 lắp sẵn", "Dây nguồn tiêu chuẩn", "Phiếu bảo hành 24 tháng", "HDSD"],
    features: [
      "Tự động tăng tốc độ lọc khi phát hiện không khí ô nhiễm hoặc có khói",
      "Theo dõi tuổi thọ lõi lọc chính xác theo giờ hoạt động qua app",
      "Khóa trẻ em an toàn trên bảng điều khiển",
      "Tích hợp báo thức chất lượng không khí qua loa giọng nói"
    ]
  }
];

// Curated Living Space Solutions & Combos
const SMARTZEN_COMBOS = [
  {
    id: "combo-an-ninh",
    title: "Combo An Ninh Tuyệt Đối 24/7",
    category: "security",
    subtitle: "Bảo vệ toàn diện ngôi nhà từ cửa ngõ đến từng góc phòng",
    targetSpace: "Căn hộ chung cư & Nhà phố",
    suitableArea: "40 - 120m²",
    originalPrice: 13370000,
    price: 10900000,
    savings: 2470000,
    badge: "Khuyên dùng an ninh",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    description: "Giải pháp trọn gói thiết lập vành đai bảo mật nhiều lớp: Nhận diện gương mặt từ cửa ngoài, giám sát 360 độ 4K và cảnh báo đột nhập/rò rỉ gas tức thì.",
    includedProductIds: ["sz-neo-lock", "sz-eye-360-ai", "sz-sentinel-radar", "sz-safeguard-leak", "sz-core-hub"],
    includedItems: [
      { name: "Khóa thông minh 3D FaceID Neo Lock Pro", qty: 1 },
      { name: "Camera an ninh AI 360° 4K Eye Guard", qty: 1 },
      { name: "Cảm biến hiện diện mmWave Radar 24GHz", qty: 1 },
      { name: "Cảm biến khói & rò rỉ khí gas SafeGuard", qty: 1 },
      { name: "Bộ trung tâm điều khiển Matter Core Hub Ultra", qty: 1 }
    ],
    perks: [
      "Miễn phí công lắp đặt & đấu nối tận nhà",
      "Tặng thêm 01 thẻ từ RFID mini & Voucher 300.000₫",
      "Bảo hành 24 tháng 1 đổi 1 tận nơi",
      "Đào tạo cài đặt app cho cả gia đình"
    ]
  },
  {
    id: "combo-phong-khach",
    title: "Combo Phòng Khách Thư Giãn & Ánh Sáng Ambient",
    category: "entertainment",
    subtitle: "Biến phòng khách thành rạp phim tại gia với ánh sáng công nghệ",
    targetSpace: "Phòng khách cao cấp",
    suitableArea: "20 - 45m²",
    originalPrice: 9810000,
    price: 7990000,
    savings: 1820000,
    badge: "Chill & Giải trí",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    description: "Tận hưởng không gian sống chuẩn resort với kịch bản ánh sáng biến hóa theo tâm trạng, rèm tự động đóng mở khi xem phim và điều khiển hoàn toàn bằng giọng nói.",
    includedProductIds: ["sz-aura-ceiling", "sz-nova-beam", "sz-silent-curtain", "sz-touch-switch", "sz-core-hub"],
    includedItems: [
      { name: "Đèn trần thông minh Aura Ceiling Pro 50W", qty: 1 },
      { name: "Dải LED Ambient RGBIC Nova Beam (5m)", qty: 2 },
      { name: "Động cơ rèm tự động siêu êm SilentCurtain Pro kèm ray 3m", qty: 1 },
      { name: "Công tắc cảm ứng kính cường lực 3 nút", qty: 1 },
      { name: "Bộ não trung tâm Matter Core Hub Ultra", qty: 1 }
    ],
    perks: [
      "Thiết lập sẵn 6 kịch bản ánh sáng: Tiếp khách, Rạp phim, Lãng mạn, Thư giãn, Tiệc tùng, Đêm muộn",
      "Đo đạc và cắt ray rèm chuẩn từng milimet theo kích thước cửa kính",
      "Miễn phí vận chuyển toàn quốc"
    ]
  },
  {
    id: "combo-can-ho",
    title: "Combo Căn Hộ Hiện Đại All-In-One",
    category: "all-in-one",
    subtitle: "Gói giải pháp nhà thông minh hoàn chỉnh được yêu thích nhất",
    targetSpace: "Căn hộ 2 phòng ngủ (45 - 85m²)",
    suitableArea: "45 - 85m²",
    originalPrice: 28100000,
    price: 22900000,
    savings: 5200000,
    badge: "Bán chạy #1",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    description: "Sự kết hợp hoàn hảo giữa dọn dẹp sàn tự động với robot Flagship X10 Ultra, an ninh FaceID, hệ thống ánh sáng sinh học và tự động hóa toàn diện căn hộ.",
    includedProductIds: ["sz-robovac-x10", "sz-neo-lock", "sz-aura-ceiling", "sz-nova-beam", "sz-sentinel-radar", "sz-touch-switch", "sz-core-hub"],
    includedItems: [
      { name: "Robot hút bụi & lau nhà tự giặt sấy Omni X10 Ultra", qty: 1 },
      { name: "Khóa cửa 3D FaceID Neo Lock Pro", qty: 1 },
      { name: "Đèn trần thông minh Aura Ceiling Pro", qty: 1 },
      { name: "Dải LED Ambient Nova Beam RGBIC 5m", qty: 1 },
      { name: "Cảm biến radar hiện diện mmWave Sentinel", qty: 2 },
      { name: "Công tắc thông minh kính cường lực", qty: 2 },
      { name: "Hub trung tâm Matter & Thread Core Hub Ultra", qty: 1 }
    ],
    perks: [
      "Tặng thêm chai nước lau sàn chuyên dụng kháng khuẩn 1.000ml",
      "Khảo sát tận nhà và lập sơ đồ vị trí lắp đặt miễn phí",
      "Ưu đãi giảm thêm 5% khi thanh toán chuyển khoản qua VietQR"
    ]
  },
  {
    id: "combo-luxury-villa",
    title: "Combo Biệt Thự & Penthouse SmartZen Luxury",
    category: "luxury",
    subtitle: "Đẳng cấp kiến trúc tương lai tối thượng cho không gian rộng lớn",
    targetSpace: "Nhà phố nhiều tầng & Biệt thự đơn lập",
    suitableArea: "Trên 130m²",
    originalPrice: 70500000,
    price: 56000000,
    savings: 14500000,
    badge: "Flagship Luxury",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    description: "Trải nghiệm nhà thông minh đỉnh cao toàn diện: Quản lý năng lượng, mạng wifi mesh phủ khắp các tầng, tự động hóa rèm cửa, robot giặt sấy và an ninh đa lớp độc lập.",
    includedProductIds: ["sz-robovac-x10", "sz-neo-lock", "sz-eye-360-ai", "sz-silent-curtain", "sz-aura-ceiling", "sz-nova-beam", "sz-sentinel-radar", "sz-safeguard-leak", "sz-air-purifier", "sz-touch-switch", "sz-core-hub"],
    includedItems: [
      { name: "Robot hút bụi lau nhà Flagship X10 Ultra", qty: 1 },
      { name: "Khóa 3D FaceID Neo Lock Pro cao cấp", qty: 2 },
      { name: "Camera an ninh 4K AI ngoài trời & trong nhà", qty: 3 },
      { name: "Hệ thống rèm tự động SilentCurtain Pro", qty: 3 },
      { name: "Đèn trần Aura Ceiling Pro & Dải LED Nova Beam", qty: 4 },
      { name: "Máy lọc không khí PureAir AI 360°", qty: 2 },
      { name: "Mạng lưới cảm biến hiện diện mmWave & Báo khói", qty: 6 },
      { name: "Hệ thống công tắc kính cường lực 4 nút", qty: 6 },
      { name: "Hub trung tâm Matter Ultra kép", qty: 2 }
    ],
    perks: [
      "Chuyên gia trưởng SmartZen trực tiếp thiết kế giải pháp và giám sát thi công",
      "Bảo hành VIP 1 đổi 1 tận nơi trong 36 tháng",
      "Đường dây nóng kỹ thuật hỗ trợ riêng 24/7/365",
      "Miễn phí bảo trì và vệ sinh hệ thống định kỳ 6 tháng/lần"
    ]
  }
];

// Helper Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getProductById(id) {
  return SMARTZEN_PRODUCTS.find(p => p.id === id);
}

function getComboById(id) {
  return SMARTZEN_COMBOS.find(c => c.id === id);
}
