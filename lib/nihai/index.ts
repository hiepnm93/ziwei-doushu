/**
 * 倪海厦 天纪 / 地纪 / 人纪 — 统一导出
 *
 * 倪海厦（1954-2012），美国汉唐中医学院创办人，
 * 当代少见的「命、相、卜、山、医」五术兼备之旷世奇人。
 *
 * 三纪体系：
 *   天纪 —— 上知天文（紫微斗数、易经、堪舆、推命、面相、测字）
 *   地纪 —— 下知地理（国家地理志、风水与国运）
 *   人纪 —— 中知人事（针灸、黄帝内经、神农本草经、伤寒论、金匮要略）
 */

export * from './types';
export { TIANJI_MODULES, HEXAGRAMS, FENGSHUI_ENTRIES, TIANJI_EPISODES, TIANJI_QUOTES, TIANJI_STATS } from './tianji';
export { RENJI_MODULES, ACU_EXPERIENCES, TRANS_NEEDLING, HANTANG_FORMULAS, CLASSIC_FORMULAS, RENJI_STATS } from './renji';
export { DIJI_MODULES, DIJI_STATS } from './diji';

/** 倪海厦完整传记 */
export const NI_HAIXIA_BIO = {
  name: 'Nghê Hải Hạ',
  nameVariant: 'Nghê Hải Hạ (cách viết khác)',
  alias: 'Phạn Vũ Long',
  birth: 'ngày 1 tháng 1 năm 1954',
  death: 'ngày 31 tháng 1 năm 2012',
  birthPlace: 'Đài Bắc',
  ancestry: 'Thụy An, Chiết Giang',
  family: 'Bảy anh chị em, thứ năm',
  education: 'Khoa Chính trị, Đại học Đông Ngô',
  title: 'Người sáng lập Học viện Trung y Hán Đường (Hoa Kỳ)',
  titles: [
    'Bậc kỳ nhân hiếm có, thông thạo Ngũ thuật: Mệnh, Tướng, Bốc, Sơn, Y',
    'Viện trưởng Học viện Trung y Hán Đường (Hoa Kỳ)',
    'Giáo sư hướng dẫn tiến sĩ Đại học Trung y dược California (Hoa Kỳ)',
    'Ủy viên cao nhất Ủy ban Trung y thuộc Sở Y tế bang Florida (2000-2003)',
    'Ủy viên và phó chủ tịch Ủy ban Châm cứu bang Florida',
    'Người kế thừa hiện đại của phái Kinh phương',
    'Người sáng lập hệ thống giảng dạy Thiên Kỷ, Nhân Kỷ',
    'Người nhận giải Hoa kiều xuất sắc hải ngoại',
  ],
  /** 师承关系 */
  teachers: [
    { name: 'Chu Tả Vũ', background: 'Danh y gia truyền bốn đời ở Bắc Kinh, sau năm 1949 chuyển sang Đài Loan', subject: 'Châm cứu', period: '1977-1981' },
    { name: 'Từ Tế Dân', background: 'Danh y Thượng Hải gốc Giang Tô', subject: 'Châm cứu', period: '1970s' },
    { name: 'Truyền thừa của Khương Tá Cảnh', background: 'Kinh phương gia theo học Tào Dĩnh Phủ', subject: 'Kinh phương', period: 'Thời học việc ở tiệm thuốc Đông y tại Cơ Long' },
  ],
  /** 核心理念 */
  corePhilosophy: [
    'Đại đạo chí giản — phi tinh bay qua bay lại quá phức tạp, không làm cái này',
    'Cung Mệnh là gốc, tam phương là dụng',
    'Nỗ lực của con người + điều chỉnh địa lý > vận mệnh tiên thiên (2/3 > 1/3)',
    'Trung y là y học vật lý, phân tích cơ thể người từ góc độ vật lý',
    'Biện chứng không biện bệnh — Trung y xem chứng hình chứ không phải tên bệnh',
    'Kinh phương một thang biết, hai thang khỏi',
    'Không muốn văn hóa Trung Hoa thất truyền, nên đã dạy rất nhiều học trò',
    'Xem mệnh là một triết học bàn về quả',
    'Chữ nghĩa chỉ là chiếc thuyền, chân lý mới là bờ bên kia',
  ],
  /** 人生大事记 */
  timeline: [
    { year: '1954', event: 'Sinh ra ở Đài Bắc, quê gốc Thụy An, Chiết Giang' },
    { year: '1970s', event: 'Thời trung học dùng «Y Tông Kim Giám» chữa khỏi chứng đau bụng kinh cho chị hai, lập chí học y' },
    { year: '1977-1981', event: 'Học châm cứu với bác sĩ Chu Tả Vũ' },
    { year: '1978', event: 'Nhập ngũ ở quân y bộ Mã Tổ, được gọi là “Thần y Mã Tổ”, khi ấy 24 tuổi' },
    { year: '1979', event: 'Sau khi xuất ngũ, lấy hóa danh “Phạn Vũ Long” bắt đầu sự nghiệp xem mệnh xem tướng' },
    { year: '1980', event: 'Di cư sang Hoa Kỳ' },
    { year: '1988', event: 'Mở “lớp Thiên văn Địa lý” ở đường Kim Sơn Nam, Đài Bắc, truyền dạy Tử Vi Đẩu Số và phong thủy dương trạch' },
    { year: '1991', event: 'Trở thành châm cứu sư đăng ký của bang Florida, Hoa Kỳ' },
    { year: '1993', event: 'Chọn đất xây Học viện Trung y Hán Đường tại Merritt Island, bang Florida' },
    { year: '1994', event: 'Hoàn thành thu âm loạt trước tác «Thiên Kỷ», gồm 24 buổi' },
    { year: '1995', event: 'Sáng lập Học viện Trung y Hán Đường' },
    { year: '2000-2003', event: 'Giữ chức ủy viên cao nhất Ủy ban Trung y thuộc Sở Y tế bang Florida' },
    { year: '2004', event: 'Mở lớp giảng Trung y «Nhân Kỷ» ở Đài Bắc' },
    { year: '2005', event: 'Xuất bản loạt DVD giảng dạy «Nhân Kỷ»' },
    { year: '2007', event: 'Bắt đầu viết «Địa Kỷ»' },
    { year: '2010', event: 'Thành lập phòng khám Kinh phương Trung y Hán Đường tại Đài Bắc; được mời diễn thuyết cả ngày tại Diễn đàn Phù Dương lần thứ ba' },
    { year: '2011', event: 'Thành lập y quán Kinh phương Trung y Hán Đường tại Thâm Quyến' },
    { year: '2012', event: 'Ngày 31 tháng 1 qua đời tại Đài Bắc vì suy tim phổi, hưởng dương 59 tuổi' },
  ],
  /** 著作体系 */
  publications: {
    originalBooks8: ['Hoàng Đế Nội Kinh Tố Vấn', 'Hoàng Đế Nội Kinh', 'Thần Nông Bản Thảo Kinh', 'Châm cứu', 'Thương Hàn Luận', 'Kim Quỹ', 'Nhân Gian Đạo', 'Thiên Cơ Đạo · Địa Mạch Đạo'],
    totalBooks: '26-44 quyển (gồm giáo trình bản chú giải, toàn tập y án, chú giải chi tiết huyệt vị, v.v.)',
    hantangFormulas: 'Hán Đường 100 phương',
    classicFormulas: '259 phương thuốc kinh điển',
    medicalCases: 'Toàn tập y án 7 quyển',
    totalVideoHours: 'Hơn 200 giờ',
  },
  /** 三纪体系 */
  sanJi: {
    tianji: {
      name: 'Thiên Kỷ',
      meaning: 'Trên biết thiên văn',
      content: 'Tử Vi Đẩu Số, 64 quẻ Kinh Dịch, phong thủy, suy mệnh, tướng mặt, trắc tự',
      recordYear: 1994,
      episodes: 24,
      hdEpisodes: 83,
      hoursPerEpisode: 2,
      totalHours: 48,
      books: ['Thiên Cơ Đạo', 'Nhân Gian Đạo', 'Địa Mạch Đạo', 'Bản đồ 64 quẻ Kinh Dịch'],
      schools: ['Tam Hợp phái (Tử Vi Đẩu Số)', 'Tượng Số phái (Kinh Dịch)', 'Cửu Tinh phái (phong thủy)', 'Hà Lạc Số Lý phái (suy mệnh)'],
      structure: 'Một giờ đầu giảng mệnh học, một giờ sau giảng Kinh Dịch',
    },
    renji: {
      name: 'Nhân Kỷ',
      meaning: 'Giữa biết nhân sự',
      content: 'Châm Cứu Đại Thành (44 buổi), Hoàng Đế Nội Kinh (20 buổi), Thần Nông Bản Thảo Kinh (46 buổi), Thương Hàn Luận, Kim Quỹ Yếu Lược (20 buổi)',
      completionYear: '2004-2005',
      totalLessons: 'Hơn 150 buổi',
      learningOrder: 'Châm cứu → Hoàng Đế Nội Kinh → Thần Nông Bản Thảo Kinh → Thương Hàn Luận → Kim Quỹ Yếu Lược',
      acuExperience: 215,
      transNeedling: 31,
      hantangFormulas: 100,
    },
    diji: {
      name: 'Địa Kỷ',
      meaning: 'Dưới biết địa lý',
      content: 'Địa chí quốc gia (chưa hoàn thành)',
      status: 'Sự nghiệp dang dở của thầy Nghê',
      note: 'Vốn định viết sau tuổi 60, qua đời năm 2012',
      startYear: 2007,
      existingContent: 'Phần phong thủy trong khóa Thiên Kỷ + di cảo do hậu nhân sắp xếp',
    },
  },
  /** 人格特征 */
  personality: {
    算命风格: 'Phán thẳng như đinh đóng cột, không chừa đường lui',
    音乐爱好: 'Thích nhất bài «Hotel California» của ban nhạc Eagles',
    生活技能: 'Nấu ăn giặt đồ việc gì cũng giỏi, tài làm bột bánh ai cũng khen',
    工作态度: 'Đầu giường quanh năm để giấy bút, gặp bệnh nan y thì khấn cầu tiên sư',
    睡眠: 'Nhiều năm ngủ ban đêm chưa đến ba tiếng',
    患者评价: 'Thường được bệnh nhân Mỹ gọi là “hy vọng cuối cùng (The last hope)”',
  },
  /** 传人选拔标准 */
  discipleStandards: [
    'Tâm tính tốt',
    'Cá tính mạnh',
    'Chủ kiến mạnh',
    'Khả năng quan sát nhạy bén',
    'Dám phê phán lý thuyết sai',
  ],
};

/** 三纪导航 */
export const SANJI_CATEGORIES = [
  { key: 'tianji' as const, name: 'Thiên Kỷ', nameEn: 'Tian Ji', icon: '⊙', meaning: 'Trên biết thiên văn', color: '#d4a843', href: '/tianji' },
  { key: 'diji' as const, name: 'Địa Kỷ', nameEn: 'Di Ji', icon: '⊞', meaning: 'Dưới biết địa lý', color: '#6b8a5e', href: '/diji' },
  { key: 'renji' as const, name: 'Nhân Kỷ', nameEn: 'Ren Ji', icon: '⊕', meaning: 'Giữa biết nhân sự', color: '#8b6b9e', href: '/renji' },
] as const;
