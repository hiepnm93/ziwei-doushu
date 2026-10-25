/**
 * 显示层越南语：引擎内部仍用中文键，渲染时经 viTerm 转为越南语（Hán-Việt）。
 * 词表 = translate/glossary.json + 下方补充表（干支、亮度、四化、补充星曜、宫名简称、格局名）。
 */
import glossary from '../../translate/glossary.json';

export const STEMS_VI = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const BRANCHES_VI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const STEMS_ZH = '甲乙丙丁戊己庚辛壬癸';
const BRANCHES_ZH = '子丑寅卯辰巳午未申酉戌亥';

const EXTRA: Record<string, string> = {
  // 亮度
  庙: 'Miếu', 旺: 'Vượng', 得: 'Đắc', 利: 'Lợi', 平: 'Bình', 不: 'Bất', 闲: 'Nhàn', 陷: 'Hãm', 地: 'Địa',
  // 四化单字
  禄: 'Lộc', 权: 'Quyền', 科: 'Khoa', 忌: 'Kỵ',
  // 五行 / 阴阳 / 性别
  金: 'Kim', 木: 'Mộc', 水: 'Thủy', 火: 'Hỏa', 土: 'Thổ', 阳: 'Dương', 阴: 'Âm', 男: 'Nam', 女: 'Nữ',
  阳男: 'Dương Nam', 阴男: 'Âm Nam', 阳女: 'Dương Nữ', 阴女: 'Âm Nữ',
  水二局: 'Thủy nhị cục', 木三局: 'Mộc tam cục', 金四局: 'Kim tứ cục', 土五局: 'Thổ ngũ cục', 火六局: 'Hỏa lục cục',
  // glossary 未收的星曜
  太阳: 'Thái Dương', 太阴: 'Thái Âm', 文曲: 'Văn Khúc', 火星: 'Hỏa Tinh', 天马: 'Thiên Mã',
  天官: 'Thiên Quan', 天福: 'Thiên Phúc', 天才: 'Thiên Tài', 天寿: 'Thiên Thọ', 天月: 'Thiên Nguyệt',
  解神: 'Giải Thần', 天伤: 'Thiên Thương', 天使: 'Thiên Sứ', 天厨: 'Thiên Trù', 天德: 'Thiên Đức',
  月德: 'Nguyệt Đức', 年解: 'Niên Giải', 截路: 'Triệt Lộ', 空亡: 'Không Vong', 天空: 'Thiên Không',
  飞廉: 'Phi Liêm', 天煞: 'Thiên Sát', 劫杀: 'Kiếp Sát', 官府: 'Quan Phủ', 官符: 'Quan Phù',
  将军: 'Tướng Quân', 岁破: 'Tuế Phá', 旬中: 'Tuần Trung', 副截: 'Phó Triệt', 副旬: 'Phó Tuần',
  衰: 'Suy', 病: 'Bệnh', 死: 'Tử', 墓: 'Mộ', 绝: 'Tuyệt', 胎: 'Thai', 养: 'Dưỡng',
  // 星曜类别
  主星: 'chính tinh', 吉星: 'cát tinh', 煞星: 'sát tinh',
  // 宫名简称（不带「宫」）
  命: 'Mệnh', 身: 'Thân', 兄弟: 'Huynh Đệ', 夫妻: 'Phu Thê', 子女: 'Tử Tức', 财帛: 'Tài Bạch', 疾厄: 'Tật Ách',
  迁移: 'Thiên Di', 交友: 'Nô Bộc', 奴仆: 'Nô Bộc', 仆役: 'Nô Bộc', 仆役宫: 'cung Nô Bộc', 官禄: 'Quan Lộc', 事业: 'Quan Lộc',
  田宅: 'Điền Trạch', 福德: 'Phúc Đức', 父母: 'Phụ Mẫu',
  // 格局名（lib/ziwei/patterns.ts）
  君臣庆会: 'Quân Thần khánh hội', 府相朝垣: 'Phủ Tướng triều viên', 阳梁昌禄: 'Dương Lương Xương Lộc',
  武贪格: 'Vũ Tham cách', 机月同梁: 'Cơ Nguyệt Đồng Lương', 廉贞天相格: 'Liêm Trinh Thiên Tướng cách',
  武曲七杀: 'Vũ Khúc Thất Sát', 天同天梁格: 'Thiên Đồng Thiên Lương cách', 日月同宫: 'Nhật Nguyệt đồng cung',
  日月夹命: 'Nhật Nguyệt giáp Mệnh', 巨日同宫: 'Cự Nhật đồng cung', 石中隐玉: 'Thạch trung ẩn ngọc',
  明珠出海: 'Minh châu xuất hải', 紫微入命: 'Tử Vi nhập Mệnh', 辅弼夹命: 'Phụ Bật giáp Mệnh',
  昌曲夹命: 'Xương Khúc giáp Mệnh', 魁钺夹命: 'Khôi Việt giáp Mệnh', 双禄朝垣: 'Song Lộc triều viên',
  三奇加会: 'Tam kỳ gia hội', 羊陀夹忌: 'Dương Đà giáp Kỵ', 火铃夹命: 'Hỏa Linh giáp Mệnh',
  空劫夹命: 'Không Kiếp giáp Mệnh', 廉杀羊: 'Liêm Sát Dương', 巨火羊: 'Cự Hỏa Dương',
  铃昌陀武: 'Linh Xương Đà Vũ', 马头带箭: 'Mã đầu đới tiễn', 化禄入财: 'Hóa Lộc nhập Tài',
  化权入官: 'Hóa Quyền nhập Quan', 机月同梁三星会: 'Cơ Nguyệt Đồng Lương tam tinh hội',
  辅弼同会: 'Phụ Bật đồng hội', 魁钺同会: 'Khôi Việt đồng hội', 科权双会: 'Khoa Quyền song hội',
  // 流派
  倪师派: 'phái thầy Nghê', 中州派: 'Trung Châu phái', 占验派: 'Chiêm Nghiệm phái',
};

// 流曜 / 运曜：流禄、运羊…
const FLOW_PREFIX: Record<string, string> = { 流: 'Lưu', 运: 'Vận', 日: 'Nhật', 月: 'Nguyệt', 时: 'Thời' };
const FLOW_STAR: Record<string, string> = {
  禄: 'Lộc Tồn', 昌: 'Văn Xương', 曲: 'Văn Khúc', 羊: 'Kình Dương', 陀: 'Đà La',
  魁: 'Thiên Khôi', 钺: 'Thiên Việt', 马: 'Thiên Mã', 鸾: 'Hồng Loan', 喜: 'Thiên Hỷ',
};

const MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(glossary as Record<string, { vi: string }>)) MAP[k] = v.vi;
Object.assign(MAP, EXTRA);
for (let i = 0; i < 10; i++) MAP[STEMS_ZH[i]] = STEMS_VI[i];
for (let i = 0; i < 12; i++) MAP[BRANCHES_ZH[i]] = BRANCHES_VI[i];
for (const [p, pv] of Object.entries(FLOW_PREFIX)) {
  for (const [s, sv] of Object.entries(FLOW_STAR)) if (!MAP[p + s]) MAP[p + s] = `${pv} ${sv}`;
}
const MAX_LEN = Math.max(...Object.keys(MAP).map(k => k.length));

/**
 * 中文术语 → 越南语。未知则原样返回。
 * 组合串：「X宫」→ cung X；整串可由已知词贪婪切分（甲子 → Giáp Tý，紫微化禄 → Tử Vi Hóa Lộc）。
 */
export function viTerm(zh: string): string {
  if (!zh) return zh;
  const hit = MAP[zh];
  if (hit) return hit;
  if (zh.length > 1 && zh.endsWith('宫')) {
    const base = viTerm(zh.slice(0, -1));
    if (base !== zh.slice(0, -1)) return `cung ${base.replace(/^cung /, '')}`;
  }
  const parts: string[] = [];
  for (let i = 0; i < zh.length;) {
    let len = Math.min(MAX_LEN, zh.length - i);
    while (len > 0 && !MAP[zh.slice(i, i + len)]) len--;
    if (!len) return zh;
    parts.push(MAP[zh.slice(i, i + len)]);
    i += len;
  }
  return parts.join(' ');
}

/** 宫名去掉前缀「cung」，用于格子标题等窄位（命宫 → Mệnh） */
export function viPalace(zh: string): string {
  return viTerm(zh).replace(/^cung /, '');
}

/** 干支索引 → 越南语 */
export const viStem = (i: number) => STEMS_VI[((i % 10) + 10) % 10];
export const viBranch = (i: number) => BRANCHES_VI[((i % 12) + 12) % 12];

/** vi-VN 日期：25/10/2026 */
export function viDate(d: Date | string | number): string {
  return new Date(d).toLocaleDateString('vi-VN');
}

/** 农历月日越南语：tháng 5 (nhuận), ngày 12 */
export function viLunar(month: number, day: number, leap = false): string {
  return `ngày ${day} tháng ${Math.abs(month)}${leap ? ' (nhuận)' : ''} âm lịch`;
}
