/**
 * 地纪 — 倪海厦地理风水体系数据库
 *
 * 「下知地理」—— 地之纪，是地理志的体系化研究。
 * 倪海厦原计划60岁后著述，利用天文地理知识与医学素养
 * 重新编写各国地理志，研究国家人性、物产与其风水地理的关系。
 *
 * 倪师于2012年辞世，地纪未能完成，为「倪师未竟之业」。
 * 现有内容来自天纪课程中的堪舆学部分以及后人整理的遗稿。
 */

import type { NiModule } from './types';

// ─── 地纪模块 ────────────────────────────────────────────
export const DIJI_MODULES: NiModule[] = [
  {
    id: 'dj-guojiadili',
    category: 'diji',
    name: 'Địa lý quốc gia',
    nameEn: 'National Geography',
    subtitle: 'Sự nghiệp dang dở của thầy Nghê · Đọc di cảo',
    description: 'Thầy Nghê dự định dùng kiến thức phong thủy địa lý để giải đọc ảnh hưởng của môi trường địa lý các nước đối với tính cách dân tộc, tài nguyên sản vật và vận hưng suy của quốc gia. Đây là đại nguyện thầy chưa kịp hoàn thành.',
    details: [
      'Địa Kỷ là phần được dự định hoàn thành sau cùng trong ba bộ trước tác của Nghê Hải Hạ, vốn định bắt đầu viết sau tuổi 60.',
      'Ý tưởng cốt lõi là dùng kiến thức phong thủy địa lý để viết lại địa chí các nước, đưa phong thủy truyền thống vào tầm vĩ mô cấp quốc gia.',
      'Hướng nghiên cứu gồm: vị trí địa lý của quốc gia, tác động của sông núi đến tính cách dân tộc, quan hệ giữa tài nguyên sản vật và thế phong thủy, sự liên hệ giữa hưng suy lịch sử và biến đổi địa lý.',
      'Thầy Nghê qua đời năm 2012, Địa Kỷ chỉ để lại ý tưởng ban đầu và nền tảng lý thuyết phong thủy trong khóa Thiên Kỷ. Những tia tư tưởng quý giá này đáng để hậu bối sắp xếp và truyền thừa.',
    ],
    references: [
      'Nghê Hải Hạ, phần phong thủy trong «Thiên Kỷ»',
      'Ý tưởng về địa chí trong các buổi giảng của Nghê Hải Hạ',
    ],
    keywords: ['Địa Kỷ', 'Địa lý quốc gia', 'Phong thủy', 'Địa chí', 'Vận nước', 'Sản vật', 'Tính người', 'Phong thủy kham dư'],
    icon: '⊞',
    status: 'preview',
    order: 1,
    slug: 'geography',
    chapters: [
      {
        id: 'dj-dl-01',
        title: 'Ý tưởng Địa Kỷ',
        subtitle: 'Đại nguyện và bản vẽ của thầy Nghê',
        description: 'Ý tưởng tổng thể của thầy Nghê về Địa Kỷ — dùng kiến thức phong thủy địa lý để giải đọc vận mệnh quốc gia.',
        keyPoints: [
          'Dự định viết sau tuổi 60 (thầy Nghê sinh năm 1954)',
          'Kết hợp kiến thức thiên văn địa lý với nền tảng y học',
          'Viết lại địa chí các nước',
          'Nghiên cứu quan hệ giữa tính người, sản vật và phong thủy địa lý',
        ],
        quotes: ['Sau sáu mươi tuổi, tôi muốn dùng kiến thức thiên văn địa lý và nền tảng y học của mình để viết lại địa chí'],
        order: 1,
      },
      {
        id: 'dj-dl-02',
        title: 'Địa lý và tính người',
        subtitle: 'Một vùng đất nuôi một kiểu người',
        description: 'Môi trường địa lý khác nhau định hình tính cách dân tộc và đặc trưng văn hóa khác nhau như thế nào.',
        keyPoints: [
          'Khác biệt tính cách giữa dân tộc miền núi và dân tộc đồng bằng',
          'Ảnh hưởng của hệ thống sông ngòi đến nền văn minh nông nghiệp',
          'Quan hệ giữa đới khí hậu với thể chất và tính cách con người',
          'Nơi phong thủy tốt ắt có người hiền xuất hiện',
        ],
        order: 2,
      },
    ],
  },
  {
    id: 'dj-kanyu-theory',
    category: 'diji',
    name: 'Nền tảng lý thuyết phong thủy',
    nameEn: 'Feng Shui Theory',
    subtitle: 'Phong thủy trong Thiên Kỷ · Hệ thống lý thuyết',
    description: 'Hệ thống hóa phần lý thuyết phong thủy trong khóa Thiên Kỷ, làm nền tảng lý thuyết cho Địa Kỷ. Gồm các lý thuyết cốt lõi như Loan Đầu học, Lý Khí học, dương trạch học.',
    details: [
      'Dù Địa Kỷ chưa thành sách độc lập, khóa Thiên Kỷ đã bao gồm nội dung lý thuyết phong thủy rất phong phú.',
      'Các lý thuyết này là khung nền của Địa Kỷ, bao quát phương pháp phân tích phong thủy từ vi mô (nhà ở) đến vĩ mô (thành phố, quốc gia).',
      'Thầy Nghê dùng Cửu Tinh phái (dòng Dương Cứu Bần), coi trọng cả Loan Đầu lẫn Lý Khí.',
      'Phần này có thể xem là “dự bị lý thuyết” của Địa Kỷ, cung cấp phương pháp luận cho việc nghiên cứu địa chí quốc gia về sau.',
    ],
    school: 'Cửu Tinh phái (dòng Dương Cứu Bần)',
    references: [
      'Nghê Hải Hạ, «Thiên Kỷ · Địa Mạch Đạo»',
      'Điển tịch phong thủy của Dương Cứu Bần',
    ],
    keywords: ['Phong thủy kham dư', 'Lý thuyết phong thủy', 'Loan Đầu', 'Lý Khí', 'Cửu Tinh phái', 'Dương Cứu Bần', 'Dương trạch', 'Âm trạch'],
    icon: '◫',
    status: 'active',
    order: 2,
    slug: 'kanyu-theory',
    chapters: [
      {
        id: 'dj-kt-01',
        title: 'Loan Đầu học',
        subtitle: 'Phán đoán hình núi thế nước',
        description: 'Quan sát hình dáng, hướng đi của núi, dòng chảy của nước và các địa hình tự nhiên khác để phán đoán cát hung phong thủy.',
        keyPoints: [
          'Long mạch: thế đi của dãy núi và khí mạch',
          'Huyệt vị: vị trí tốt nhất để tàng phong tụ khí',
          'Sa thủ: thế núi ôm bọc hai bên huyệt',
          'Thủy khẩu: phương vị nước vào và ra',
        ],
        order: 1,
      },
      {
        id: 'dj-kt-02',
        title: 'Lý Khí học',
        subtitle: 'Suy tính cát hung của phương vị',
        description: 'Dùng la bàn đo phương vị, kết hợp các lý thuyết như Cửu Tinh phi bố, Bát Sát Hoàng Tuyền để suy tính cát hung.',
        keyPoints: [
          'Cách dùng la bàn',
          'Nguyên lý của Cửu Tinh phi bố',
          'Các phương vị cấm kỵ của Bát Sát Hoàng Tuyền',
          'Các phương vị tốt của Tam Cát Lục Tú',
        ],
        order: 2,
      },
      {
        id: 'dj-kt-03',
        title: 'Ứng dụng dương trạch',
        subtitle: 'Thực hành phong thủy cho môi trường sống',
        description: 'Phương pháp thao tác thực tế đưa lý thuyết phong thủy vào việc chọn và bố trí nhà ở.',
        keyPoints: [
          'Nguyên tắc chọn tọa hướng nhà',
          'Bố trí phương vị các khu chức năng trong nhà',
          'Phán đoán cát hung của môi trường xung quanh',
          'Cách hóa giải phong thủy xấu',
        ],
        order: 3,
      },
    ],
  },
  {
    id: 'dj-yigao',
    category: 'diji',
    name: 'Di cảo và hậu học',
    nameEn: 'Legacy & Continuation',
    subtitle: 'Hậu bối bổ chú · Lửa truyền đời đời',
    description: 'Tập hợp những lời giảng rải rác của thầy Nghê về Địa Kỷ, phần bổ chú nghiên cứu của học trò hậu bối, và sự mở rộng hiện đại của tư tưởng Địa Kỷ.',
    details: [
      'Thầy Nghê chưa hoàn thành chuyên luận Địa Kỷ, nhưng trong khóa Thiên Kỷ và các dịp khác nhiều lần nhắc đến ý tưởng và điểm chính của Địa Kỷ.',
      'Học trò hậu bối và các nhà nghiên cứu đã dựa vào lời giảng và di cảo của thầy Nghê để sắp xếp và bổ chú ở mức độ nhất định.',
      'Tư tưởng Địa Kỷ có giá trị tham khảo quan trọng trong nghiên cứu phong thủy hiện đại, quy hoạch đô thị, khoa học môi trường và các lĩnh vực khác.',
      'Mô-đun này nhằm thu thập, sắp xếp mọi tài liệu rải rác liên quan đến Địa Kỷ, làm nền tảng cho nghiên cứu về sau.',
    ],
    references: [
      'Ghi chép các buổi giảng của Nghê Hải Hạ',
      'Ghi chép và nghiên cứu của học trò hậu bối',
    ],
    keywords: ['Di cảo', 'Hậu học', 'Bổ chú', 'Truyền thừa', 'Ứng dụng hiện đại'],
    icon: '⊟',
    status: 'coming',
    order: 3,
    slug: 'legacy',
    chapters: [
      {
        id: 'dj-yg-01',
        title: 'Ngữ lục Địa Kỷ của thầy Nghê',
        subtitle: 'Tư tưởng Địa Kỷ rải rác trong các khóa học',
        description: 'Trích những luận thuật quan trọng của thầy Nghê về Địa Kỷ từ các khóa Thiên Kỷ, Nhân Kỷ.',
        keyPoints: [
          'Động cơ sáng tác và kế hoạch của Địa Kỷ',
          'Quan sát về môi trường địa lý các nước',
          'Luận thuật về quan hệ giữa phong thủy và vận nước',
          'Mối liên hệ giữa Địa Kỷ với Thiên Kỷ, Nhân Kỷ',
        ],
        quotes: [
          'Nỗ lực của con người cộng với điều chỉnh về địa lý, nhất định lớn hơn vận mệnh tiên thiên',
          '2/3 lớn hơn 1/3 — nhân sự + địa lý = 2/3, vận mệnh tiên thiên = 1/3',
        ],
        order: 1,
      },
    ],
  },
];

// ─── 统计 ────────────────────────────────────────────────
export const DIJI_STATS = {
  totalModules: DIJI_MODULES.length,
  totalChapters: DIJI_MODULES.reduce((sum, m) => sum + m.chapters.length, 0),
  status: 'Sự nghiệp dang dở của thầy Nghê · Hậu bối tiếp tục sắp xếp',
  note: 'Nghê Hải Hạ vốn định viết Địa Kỷ sau tuổi 60, nhưng qua đời năm 2012; Địa Kỷ chỉ để lại ý tưởng và nền tảng lý thuyết',
};
