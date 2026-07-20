export interface ArtifactData {
  id: string;
  roomId: string;
  title: string;
  year: string;
  description: string;
  audioUrl?: string;
  imageUrl?: string;
  position: [number, number, number];
  color: string;
  type: 'document' | 'object' | 'flag' | 'monument';
}

export interface RoomData {
  id: string;
  name: string;
  period: string;
  description: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  colorTheme: string;
}

export const ROOMS: RoomData[] = [
  {
    id: "main-hall",
    name: "Sảnh Chính Kim Liên",
    period: "Tổng Quan",
    description: "Không gian biểu tượng trung tâm tôn vinh Lịch sử Đảng Cộng sản Việt Nam.",
    cameraPosition: [0, 5.5, 28],
    targetPosition: [0, 1, 12],
    colorTheme: "#ffd700",
  },
  {
    id: "room-1930",
    name: "Phòng 1: Ánh Sáng Bình Minh",
    period: "1930 - 1945",
    description: "Thành lập Đảng Cộng sản Việt Nam và Cách mạng Tháng Tám thành công.",
    cameraPosition: [-22, 5.5, 28],
    targetPosition: [-22, 1, 12],
    colorTheme: "#ff4444",
  },
  {
    id: "room-1954",
    name: "Phòng 2: Trường Kỳ Kháng Chiến",
    period: "1945 - 1975",
    description: "Cuộc kháng chiến chống thực dân, đế quốc và Đại thắng Mùa Xuân 1975.",
    cameraPosition: [0, 5.5, -6],
    targetPosition: [0, 1, -20],
    colorTheme: "#ffaa00",
  },
  {
    id: "room-modern",
    name: "Phòng 3: Đổi Mới & Phát Triển",
    period: "1975 - Nay",
    description: "Thời kỳ hội nhập, phát triển đất nước vững bước tiến lên Chủ nghĩa Xã hội.",
    cameraPosition: [22, 5.5, 28],
    targetPosition: [22, 1, 12],
    colorTheme: "#00ccff",
  },
];

export const ARTIFACTS: ArtifactData[] = [
  // Sảnh chính
  {
    id: "main-symbol",
    roomId: "main-hall",
    title: "Biểu Tượng Búa Liềm Vàng",
    year: "1930",
    description: "Biểu tượng thiêng liêng đại diện cho sự đoàn kết giữa giai cấp công nhân và nông dân Việt Nam.",
    position: [0, 1.5, 0],
    color: "#ffd700",
    type: "monument",
  },
  {
    id: "tuong-dai-bac",
    roomId: "main-hall",
    title: "Tượng Đài Chủ Tịch Hồ Chí Minh",
    year: "1945",
    description: "Tượng đài Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
    position: [0, 1.5, 18],
    color: "#e8d5b5",
    type: "monument",
  },

  // ==========================================
  // Phòng 1 (1930-1945) (x: -32 to -12, z: -8 to 32)
  // ==========================================
  {
    id: "bao-thanh-nien",
    roomId: "room-1930",
    title: "Báo Thanh Niên",
    year: "06/1925",
    description: "Tờ báo do Nguyễn Ái Quốc sáng lập, chuẩn bị về tư tưởng, chính trị và tổ chức cho sự ra đời của Đảng.",
    position: [-22, 1, 18],
    color: "#e6ccaa",
    type: "document",
    imageUrl: "/assets/images/bao_thanh_nien.jpg",
  },
  {
    id: "cuong-linh-1930",
    roomId: "room-1930",
    title: "Chánh Cương Vắn Tắt",
    year: "02/1930",
    description: "Văn kiện lịch sử do Nguyễn Ái Quốc soạn thảo tại Hội nghị thành lập Đảng ở Hương Cảng, vạch ra đường lối cách mạng.",
    position: [-26, 1, 12],
    color: "#ff4444",
    type: "document",
    imageUrl: "/assets/images/cuong_linh_1930.jpg",
  },
  {
    id: "co-dang-1930",
    roomId: "room-1930",
    title: "Cờ Búa Liềm Xô Viết Nghệ Tĩnh",
    year: "1930 - 1931",
    description: "Lá cờ đỏ biểu tượng cho tinh thần đấu tranh kiên cường của nhân dân Nghệ Tĩnh trong cao trào cách mạng đầu tiên.",
    position: [-22, 1, 6],
    color: "#cc0000",
    type: "flag",
    imageUrl: "/assets/images/co_dang_1930.webp",
  },
  {
    id: "chi-thi-nhat-phap",
    roomId: "room-1930",
    title: "Chỉ Thị 'Nhật Pháp Bắn Nhau'",
    year: "12/03/1945",
    description: "Chỉ thị lịch sử của Ban Thường vụ Trung ương Đảng, phát động cao trào kháng Nhật cứu nước, tiền đề cho Tổng khởi nghĩa.",
    position: [-18, 1, 12],
    color: "#d4a373",
    type: "document",
    imageUrl: "/assets/images/chi_thi_nhat_phap.jpg",
  },

  // ==========================================
  // Phòng 2 (1945-1975) (x: -32 to 32, z: -32 to -8)
  // ==========================================
  {
    id: "loi-keu-goi",
    roomId: "room-1954",
    title: "Lời Kêu Gọi Toàn Quốc Kháng Chiến",
    year: "12/1946",
    description: "'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước...'. Lời hiệu triệu vĩ đại của Bác Hồ mở đầu cuộc kháng chiến chống Pháp.",
    position: [-16, 1, -20],
    color: "#e07a5f",
    type: "document",
  },
  {
    id: "may-chu-bac-ho",
    roomId: "room-1954",
    title: "Máy Chữ Chiến Khu Việt Bắc",
    year: "1947 - 1954",
    description: "Kỷ vật kháng chiến được Bác Hồ và Trung ương Đảng sử dụng để soạn thảo nhiều chỉ thị, mệnh lệnh quan trọng tại ATK.",
    position: [-8, 1, -20],
    color: "#4a4e69",
    type: "object",
  },
  {
    id: "co-quyet-thang",
    roomId: "room-1954",
    title: "Lá Cờ 'Quyết Chiến Quyết Thắng'",
    year: "07/05/1954",
    description: "Lá cờ tung bay trên nóc hầm De Castries đánh dấu thắng lợi lịch sử Điện Biên Phủ, lừng lẫy năm châu chấn động địa cầu.",
    position: [0, 1, -24],
    color: "#ff3300",
    type: "flag",
    imageUrl: "/assets/images/co_quyet_chien.webp",
  },
  {
    id: "dep-cao-su",
    roomId: "room-1954",
    title: "Đôi Dép Cao Su Trường Sơn",
    year: "1959 - 1975",
    description: "Biểu tượng giản dị mà kiên cường của Bộ đội Cụ Hồ xẻ dọc Trường Sơn đi cứu nước, thực hiện Nghị quyết Trung ương 15.",
    position: [8, 1, -20],
    color: "#2b2d42",
    type: "object",
  },
  {
    id: "xe-tang-390",
    roomId: "room-1954",
    title: "Mô Hình Xe Tăng 390",
    year: "30/04/1975",
    description: "Chiếc xe tăng lịch sử húc đổ cổng chính Dinh Độc Lập, đánh dấu sự toàn thắng của Chiến dịch Hồ Chí Minh vĩ đại.",
    position: [16, 1, -20],
    color: "#556b2f",
    type: "object",
  },

  // ==========================================
  // Phòng 3 (Hiện đại) (x: 12 to 32, z: -8 to 32)
  // ==========================================
  {
    id: "nghi-quyet-doi-moi",
    roomId: "room-modern",
    title: "Nghị Quyết Đại Hội VI",
    year: "12/1986",
    description: "Đại hội Đổi Mới toàn diện đất nước, đánh dấu bước ngoặt lịch sử đưa Việt Nam thoát khỏi khủng hoảng kinh tế - xã hội.",
    position: [22, 1, 18],
    color: "#00ccff",
    type: "document",
  },
  {
    id: "hien-phap-1992",
    roomId: "room-modern",
    title: "Hiến Pháp Năm 1992",
    year: "1992",
    description: "Bản Hiến pháp của thời kỳ đầu Đổi mới, thể chế hóa đường lối của Đảng, tạo cơ sở pháp lý vững chắc cho phát triển đất nước.",
    position: [26, 1, 12],
    color: "#8d99ae",
    type: "document",
  },
  {
    id: "wto-accession",
    roomId: "room-modern",
    title: "Bút Ký Gia Nhập WTO",
    year: "2007",
    description: "Kỷ vật đánh dấu bước ngoặt hội nhập kinh tế quốc tế sâu rộng của Việt Nam dưới sự lãnh đạo đúng đắn của Đảng.",
    position: [22, 1, 6],
    color: "#219ebc",
    type: "object",
  },
  {
    id: "van-kien-dai-hoi-13",
    roomId: "room-modern",
    title: "Văn Kiện Đại Hội XIII",
    year: "2021",
    description: "Định hướng chiến lược phát triển đất nước phồn vinh, hạnh phúc, tầm nhìn đến năm 2030 và 2045.",
    position: [18, 1, 12],
    color: "#d00000",
    type: "document",
  },
];
