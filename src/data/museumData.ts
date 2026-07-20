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
    description: "Biểu tượng thiêng liêng đại diện cho sự đoàn kết bền chặt giữa giai cấp công nhân và nông dân Việt Nam. Chiếc búa tượng trưng cho giai cấp công nhân công nghiệp, chiếc liềm tượng trưng cho giai cấp nông dân. Sự kết hợp này khẳng định liên minh công - nông là nền tảng vững chắc của cách mạng Việt Nam dưới sự lãnh đạo của Đảng Cộng sản.",
    position: [0, 1.5, 0],
    color: "#ffd700",
    type: "monument",
  },
  {
    id: "tuong-dai-bac",
    roomId: "main-hall",
    title: "Tượng Đài Chủ Tịch Hồ Chí Minh",
    year: "1945",
    description: "Bức tượng tái hiện lại khoảnh khắc lịch sử thiêng liêng khi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình vào ngày 2 tháng 9 năm 1945, chính thức khai sinh ra nước Việt Nam Dân chủ Cộng hòa. Người mặc bộ quần áo kaki giản dị, giọng điệu ấm áp, dõng dạc khẳng định quyền độc lập, tự do của dân tộc Việt Nam trước toàn thế giới.",
    position: [0, 1.5, 18],
    color: "#e8d5b5",
    type: "monument",
  },

  // Phòng 1 (1930-1945)
  {
    id: "bao-thanh-nien",
    roomId: "room-1930",
    title: "Báo Thanh Niên",
    year: "06/1925",
    description: "Tờ báo do Nguyễn Ái Quốc sáng lập tại Quảng Châu (Trung Quốc), là cơ quan ngôn luận của Hội Việt Nam Cách mạng Thanh niên. Báo đã đóng vai trò to lớn trong việc truyền bá chủ nghĩa Mác - Lênin vào Việt Nam, chuẩn bị về mặt tư tưởng, chính trị và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam.",
    position: [-22, 1, 18],
    color: "#e6ccaa",
    type: "document",
    imageUrl: "/assets/images/bao_thanh_nien.png",
  },
  {
    id: "cuong-linh-1930",
    roomId: "room-1930",
    title: "Chánh Cương Vắn Tắt",
    year: "02/1930",
    description: "Văn kiện lịch sử vô cùng quan trọng do Nguyễn Ái Quốc soạn thảo, được thông qua tại Hội nghị hợp nhất thành lập Đảng ở Hương Cảng. Đây được xem là Cương lĩnh chính trị đầu tiên của Đảng, vạch ra đường lối chiến lược cơ bản của cách mạng Việt Nam: đánh đổ đế quốc Pháp và phong kiến, làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản.",
    position: [-26, 1, 12],
    color: "#ff4444",
    type: "document",
  },
  {
    id: "co-dang-1930",
    roomId: "room-1930",
    title: "Cờ Búa Liềm Xô Viết Nghệ Tĩnh",
    year: "1930 - 1931",
    description: "Lá cờ đỏ sao vàng mang biểu tượng búa liềm là minh chứng hùng hồn cho tinh thần đấu tranh kiên cường, bất khuất của nhân dân Nghệ An và Hà Tĩnh trong cao trào cách mạng 1930-1931. Dưới lá cờ này, phong trào đấu tranh đã dẫn đến sự ra đời của chính quyền Xô viết đầu tiên tại Việt Nam, khẳng định năng lực lãnh đạo của Đảng ngay từ những ngày đầu.",
    position: [-22, 1, 6],
    color: "#cc0000",
    type: "flag",
  },
  {
    id: "chi-thi-nhat-phap",
    roomId: "room-1930",
    title: "Chỉ Thị 'Nhật Pháp Bắn Nhau'",
    year: "12/03/1945",
    description: "Bản chỉ thị nhạy bén của Ban Thường vụ Trung ương Đảng ngay sau khi Nhật đảo chính Pháp. Chỉ thị đã xác định kẻ thù chính lúc này là phát xít Nhật, phát động cao trào kháng Nhật cứu nước mạnh mẽ trên toàn quốc, tạo tiền đề vững chắc và trực tiếp cho thắng lợi của cuộc Tổng khởi nghĩa Tháng Tám năm 1945.",
    position: [-18, 1, 12],
    color: "#d4a373",
    type: "document",
  },

  // Phòng 2 (1945-1975)
  {
    id: "loi-keu-goi",
    roomId: "room-1954",
    title: "Lời Kêu Gọi Toàn Quốc Kháng Chiến",
    year: "12/1946",
    description: "'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ...'. Lời hiệu triệu lịch sử của Bác Hồ được phát đi từ pháo đài Láng, chính thức mở đầu cuộc kháng chiến toàn quốc chống thực dân Pháp. Lời kêu gọi đã khơi dậy mạnh mẽ lòng yêu nước, tinh thần quyết tử cho Tổ quốc quyết sinh của toàn dân tộc.",
    position: [-16, 1, -20],
    color: "#e07a5f",
    type: "document",
  },
  {
    id: "may-chu-bac-ho",
    roomId: "room-1954",
    title: "Máy Chữ Chiến Khu Việt Bắc",
    year: "1947 - 1954",
    description: "Chiếc máy chữ lịch sử đã đồng hành cùng Bác Hồ và Trung ương Đảng trong suốt những năm tháng gian khổ tại An Toàn Khu (ATK) Việt Bắc. Trên chiếc máy này, hàng trăm văn kiện, chỉ thị, bức thư và mệnh lệnh quan trọng đã được soạn thảo, trực tiếp chỉ đạo cuộc kháng chiến chống Pháp đi từ thắng lợi này đến thắng lợi khác.",
    position: [-8, 1, -20],
    color: "#4a4e69",
    type: "object",
  },
  {
    id: "co-quyet-thang",
    roomId: "room-1954",
    title: "Lá Cờ 'Quyết Chiến Quyết Thắng'",
    year: "07/05/1954",
    description: "Lá cờ đỏ sao vàng đã tung bay kiêu hãnh trên nóc hầm tướng De Castries vào chiều ngày 7/5/1954, đánh dấu thời khắc kết thúc thắng lợi rực rỡ của chiến dịch Điện Biên Phủ. Đây là minh chứng lịch sử của một chiến thắng 'lừng lẫy năm châu, chấn động địa cầu', chấm dứt hoàn toàn ách thống trị của thực dân Pháp tại Việt Nam.",
    position: [0, 1, -24],
    color: "#ff3300",
    type: "flag",
  },
  {
    id: "dep-cao-su",
    roomId: "room-1954",
    title: "Đôi Dép Cao Su Trường Sơn",
    year: "1959 - 1975",
    description: "Đôi dép lốp được cắt ra từ những chiếc lốp xe ô tô hỏng, trở thành biểu tượng vô cùng giản dị nhưng chứa đựng sức mạnh phi thường của Bộ đội Cụ Hồ. Những đôi dép này đã cùng hàng triệu thanh niên Việt Nam xẻ dọc dãy Trường Sơn hùng vĩ đi cứu nước, viết nên bản anh hùng ca bất diệt trong cuộc kháng chiến chống Mỹ cứu nước.",
    position: [8, 1, -20],
    color: "#2b2d42",
    type: "object",
  },
  {
    id: "xe-tang-390",
    roomId: "room-1954",
    title: "Mô Hình Xe Tăng 390",
    year: "30/04/1975",
    description: "Mô hình chiếc xe tăng T-54 mang số hiệu 390 thuộc Lữ đoàn xe tăng 203. Trưa ngày 30 tháng 4 năm 1975, chiếc xe tăng này đã húc tung cổng chính của Dinh Độc Lập, đánh dấu thời khắc lịch sử chính quyền Sài Gòn sụp đổ. Đây là hình ảnh biểu tượng bất diệt của sự kiện giải phóng miền Nam, thống nhất đất nước.",
    position: [16, 1, -20],
    color: "#556b2f",
    type: "object",
  },

  // Phòng 3 (Hiện đại)
  {
    id: "nghi-quyet-doi-moi",
    roomId: "room-modern",
    title: "Nghị Quyết Đại Hội VI",
    year: "12/1986",
    description: "Đại hội đại biểu toàn quốc lần thứ VI của Đảng đã ghi dấu ấn lịch sử với đường lối Đổi Mới toàn diện đất nước. Nghị quyết đã mạnh dạn nhìn thẳng vào sự thật, đánh giá đúng sự thật, từ đó đề ra các chính sách cải cách kinh tế sâu rộng, chuyển từ cơ chế bao cấp sang nền kinh tế hàng hóa nhiều thành phần, mở ra một kỷ nguyên phát triển mới cho Việt Nam.",
    position: [22, 1, 18],
    color: "#00ccff",
    type: "document",
  },
  {
    id: "hien-phap-1992",
    roomId: "room-modern",
    title: "Hiến Pháp Năm 1992",
    year: "1992",
    description: "Bản Hiến pháp của thời kỳ đầu Đổi mới, đã thể chế hóa đường lối của Đảng thành các quy định pháp luật tối cao. Hiến pháp 1992 tạo cơ sở pháp lý vững chắc cho việc phát triển nền kinh tế thị trường định hướng xã hội chủ nghĩa, mở rộng dân chủ và xây dựng nhà nước pháp quyền của dân, do dân và vì dân.",
    position: [26, 1, 12],
    color: "#8d99ae",
    type: "document",
  },
  {
    id: "wto-accession",
    roomId: "room-modern",
    title: "Bút Ký Gia Nhập WTO",
    year: "2007",
    description: "Kỷ vật ghi nhận thời khắc lịch sử khi Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới (WTO). Sự kiện này đánh dấu bước ngoặt trọng đại trong quá trình hội nhập kinh tế quốc tế sâu rộng, khẳng định vị thế ngày càng cao của Việt Nam trên trường quốc tế dưới sự lãnh đạo đúng đắn của Đảng.",
    position: [22, 1, 6],
    color: "#219ebc",
    type: "object",
  },
  {
    id: "van-kien-dai-hoi-13",
    roomId: "room-modern",
    title: "Văn Kiện Đại Hội XIII",
    year: "2021",
    description: "Tập văn kiện quan trọng đề ra định hướng chiến lược phát triển đất nước trong giai đoạn mới. Đại hội XIII đã khẳng định khát vọng phát triển đất nước phồn vinh, hạnh phúc, với tầm nhìn mục tiêu đưa Việt Nam trở thành nước phát triển, thu nhập cao vào năm 2045 - đúng dịp kỷ niệm 100 năm thành lập nước.",
    position: [18, 1, 12],
    color: "#d00000",
    type: "document",
  },
];
