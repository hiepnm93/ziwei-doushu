/**
 * 紫微斗数格局识别（v2 严格化版本）
 *
 * 设计原则：
 * 1. 古书条件优先：每个格局列出"Bắt buộc / Cộng điểm / Phá cách"三层结构，出处可考
 * 2. 倪师立场：不使用宫干自化、大限四化、来因宫等飞星派工具
 * 3. 庙旺利陷：用 brightness 字段（bright=庙旺、normal=平、dim=陷）
 * 4. 三方四正会照：命宫 + 财帛 + 官禄 + 迁移
 * 5. 夹宫：命宫前后两宫
 *
 * 主要古籍出处：
 *  - 《紫微斗数全集》（陈抟祖师传，明代刊本）
 *  - 《紫微斗数全书》（罗洪先编，明代刊本）
 *  - 《骨髓赋》《女命骨髓赋》《十二宫诸星得地合格诀》
 *  - 倪师《天纪》紫微斗数讲义
 */

import 'server-only';
import type { ZiweiChart, Palace, Star } from './types';

// ────────────────── 类型 ──────────────────
export interface PatternCondition {
  required: string[];   // 必须满足条件（已通过的）
  bonus?: string[];     // 加分项（已触发）
  breaking?: string[];  // 破格警示（已触发）
}

export interface Pattern {
  name: string;
  level: 'excellent' | 'good' | 'neutral' | 'caution';
  description: string;
  palaces: string[];                 // 涉及宫位
  conditions?: PatternCondition;     // 成立条件分层（v2 新增）
  source?: string;                   // 古籍出处（v2 新增）
}

// ────────────────── 常量 ──────────────────
const SHA_NAMES = ['擎羊', '陀罗', '火星', '铃星', '地空', '地劫'];
const SHA_HARD = ['擎羊', '陀罗', '火星', '铃星'];   // 四煞
const SHA_KONG = ['地空', '地劫'];                  // 空劫
const ZUO_YOU = ['左辅', '右弼'];
const CHANG_QU = ['文昌', '文曲'];
const KUI_YUE = ['天魁', '天钺'];

// ────────────────── 辅助函数 ──────────────────
function getMajorStarNames(palace: Palace): string[] {
  return palace.stars.filter(s => s.type === 'major').map(s => s.name);
}
function findStar(palace: Palace, name: string): Star | undefined {
  return palace.stars.find(s => s.name === name);
}
function hasStar(palace: Palace, name: string): boolean {
  return palace.stars.some(s => s.name === name);
}
function findStarPalace(chart: ZiweiChart, name: string): Palace | undefined {
  return chart.palaces.find(p => p.stars.some(s => s.name === name));
}
function getPalaceByBranch(chart: ZiweiChart, branch: number): Palace | undefined {
  return chart.palaces.find(p => p.branch === ((branch % 12) + 12) % 12);
}
function shaCountInPalace(palace: Palace, list: string[] = SHA_HARD): number {
  return palace.stars.filter(s => list.includes(s.name)).length;
}
function hasShaInPalace(palace: Palace, list: string[] = SHA_NAMES): boolean {
  return palace.stars.some(s => list.includes(s.name));
}
function getSanFangPalaces(chart: ZiweiChart): Palace[] {
  const m = chart.mingGongBranch;
  const branches = [m, (m + 4) % 12, (m + 8) % 12, (m + 6) % 12];
  return chart.palaces.filter(p => branches.includes(p.branch));
}
function isInSanFang(chart: ZiweiChart, branch: number): boolean {
  const m = chart.mingGongBranch;
  return [m, (m + 4) % 12, (m + 8) % 12, (m + 6) % 12].includes(branch);
}
function getDuiGong(chart: ZiweiChart, branch: number): Palace | undefined {
  return getPalaceByBranch(chart, (branch + 6) % 12);
}
function getJiaPalaces(chart: ZiweiChart, branch: number): { prev?: Palace; next?: Palace } {
  return {
    prev: getPalaceByBranch(chart, (branch + 11) % 12),
    next: getPalaceByBranch(chart, (branch + 1) % 12),
  };
}
function sanFangAllStars(chart: ZiweiChart): Set<string> {
  return new Set(getSanFangPalaces(chart).flatMap(p => p.stars.map(s => s.name)));
}
function sanFangShaCount(chart: ZiweiChart, list: string[] = SHA_HARD): number {
  return getSanFangPalaces(chart).reduce((sum, p) => sum + shaCountInPalace(p, list), 0);
}
function isBright(palace: Palace, starName: string): boolean {
  const s = findStar(palace, starName);
  return s?.brightness === 'bright';
}
function isDim(palace: Palace, starName: string): boolean {
  const s = findStar(palace, starName);
  return s?.brightness === 'dim';
}
function getStarSiHua(palace: Palace, starName: string): Star['siHua'] | undefined {
  return findStar(palace, starName)?.siHua;
}

// Tên sao -> Hán-Việt để ghép vào câu hiển thị (khóa tra cứu vẫn là chữ Hán)
const STAR_VI: Record<string, string> = {
  紫微: 'Tử Vi', 天机: 'Thiên Cơ', 太阳: 'Thái Dương', 武曲: 'Vũ Khúc', 天同: 'Thiên Đồng', 廉贞: 'Liêm Trinh',
  天府: 'Thiên Phủ', 太阴: 'Thái Âm', 贪狼: 'Tham Lang', 巨门: 'Cự Môn', 天相: 'Thiên Tướng', 天梁: 'Thiên Lương',
  七杀: 'Thất Sát', 破军: 'Phá Quân', 火星: 'Hỏa Tinh', 铃星: 'Linh Tinh', 擎羊: 'Kình Dương', 陀罗: 'Đà La',
  文昌: 'Văn Xương', 文曲: 'Văn Khúc', 左辅: 'Tả Phù', 右弼: 'Hữu Bật', 天魁: 'Thiên Khôi', 天钺: 'Thiên Việt',
  禄存: 'Lộc Tồn', 天马: 'Thiên Mã', 地空: 'Địa Không', 地劫: 'Địa Kiếp',
};
const vs = (n: string): string => STAR_VI[n] ?? n;
const BRANCH_VI: Record<string, string> = {
  子: 'Tý', 丑: 'Sửu', 寅: 'Dần', 卯: 'Mão', 辰: 'Thìn', 巳: 'Tỵ', 午: 'Ngọ', 未: 'Mùi', 申: 'Thân', 酉: 'Dậu', 戌: 'Tuất', 亥: 'Hợi',
};
const BRANCH_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ────────────────── 正格识别器 ──────────────────

/** 君臣庆会：紫微入命，左辅右弼同会（同宫或三方） */
function detectJunChenQingHui(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (!hasStar(ming, '紫微')) return;
  const sanFangSet = sanFangAllStars(chart);
  const hasZuo = sanFangSet.has('左辅');
  const hasYou = sanFangSet.has('右弼');
  if (!hasZuo || !hasYou) return;

  const required = ['Tử Vi nhập Mệnh', 'Tả Phù Hữu Bật cùng hội tam phương tứ chính'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangSet.has('文昌') || sanFangSet.has('文曲')) bonus.push('Lại hội Văn Xương hoặc Văn Khúc');
  if (sanFangSet.has('天魁') || sanFangSet.has('天钺')) bonus.push('Khôi Việt quý nhân chiếu thêm');
  if (getStarSiHua(ming, '紫微') === '权') bonus.push('Tử Vi Hóa Quyền');
  if (sanFangShaCount(chart, SHA_KONG) >= 2) breaking.push('Địa Không Địa Kiếp cùng giáp hoặc hội chiếu (Tử Vi kỵ Không Kiếp)');

  patterns.push({
    name: 'Quân Thần Khánh Hội',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Tử Vi nhập Mệnh, Tả Phù Hữu Bật cùng hội, như đế vương có hiền thần phò tá, chủ đại phú đại quý, mệnh thống lĩnh. Cả đời quý nhân không dứt, nên đi con đường chức cao trong chính trị, kinh doanh hoặc lãnh đạo liên ngành.',
    palaces: ['命宫'],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Quân Thần Khánh Hội cách»',
  });
}

/** 紫府同宫：紫微+天府于命宫（限寅、申宫） */
function detectZiFu(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const ziwei = findStarPalace(chart, '紫微');
  const tianfu = findStarPalace(chart, '天府');
  if (!ziwei || !tianfu || ziwei.branch !== tianfu.branch) return;

  const inMing = ziwei.branch === chart.mingGongBranch;
  const required = inMing
    ? ['Tử Vi Thiên Phủ cùng nhập cung Mệnh']
    : ['Tử Vi Thiên Phủ đồng cung (không ở cung Mệnh, hội chiếu giảm lực)'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  const sanFangSet = sanFangAllStars(chart);
  if (sanFangSet.has('左辅') && sanFangSet.has('右弼')) bonus.push('Tả Phù Hữu Bật cùng hội');
  if (sanFangSet.has('文昌') || sanFangSet.has('文曲')) bonus.push('Lại hội Xương Khúc');
  if (hasShaInPalace(ziwei, SHA_KONG)) breaking.push('Cung Tử Phủ có Không Kiếp (phá quý khí của Tử Phủ)');
  if (shaCountInPalace(ziwei, SHA_HARD) >= 2) breaking.push('Cung Tử Phủ gặp hai Sát tinh đồng tọa');

  patterns.push({
    name: 'Tử Phủ Đồng Cung',
    level: inMing && !breaking.length ? 'excellent' : 'good',
    description: inMing
      ? 'Tử Vi Thiên Phủ cùng nhập cung Mệnh, đế tướng cùng đến, mệnh tôn quý. Chủ phẩm hạnh đoan chính, cơm áo không lo, có tài lãnh đạo, nên đảm nhiệm chức vụ trọng yếu. Cần Tả Phù Hữu Bật phối hợp mới thành đại cách trọn vẹn.'
      : 'Tử Vi Thiên Phủ đồng cung nhưng không tọa Mệnh, chủ cả đời có quý nhân và quý khí nương tựa, nhưng bản thân chưa chắc đại phú đại quý, cần xem cát sát hội chiếu mà định.',
    palaces: [ziwei.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tử Phủ Đồng Cung cách»',
  });
}

/** 府相朝垣：天府、天相分别坐守命宫的三方四正 */
function detectFuXiangChaoYuan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const tianfu = findStarPalace(chart, '天府');
  const tianxiang = findStarPalace(chart, '天相');
  if (!tianfu || !tianxiang) return;
  if (!isInSanFang(chart, tianfu.branch) || !isInSanFang(chart, tianxiang.branch)) return;
  if (tianfu.branch === chart.mingGongBranch && tianxiang.branch === chart.mingGongBranch) return;
  if (tianfu.branch === tianxiang.branch) return;

  const required = ['Thiên Phủ ở tam phương của Mệnh', 'Thiên Tướng ở tam phương của Mệnh', 'Hai sao không đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (hasStar(ming, '禄存') || hasStar(ming, '化禄')) bonus.push('Cung Mệnh gặp Lộc');
  if (sanFangAllStars(chart).has('左辅')) bonus.push('Lại hội Tả Phù');
  if (hasShaInPalace(ming, SHA_HARD)) breaking.push('Cung Mệnh có Sát tinh');
  if (sanFangShaCount(chart, SHA_HARD) >= 3) breaking.push('Tam phương tứ chính Sát tinh quá nhiều');

  patterns.push({
    name: 'Phủ Tướng Triều Viên',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thiên Phủ Thiên Tướng chia nhau giữ tam phương tứ chính của cung Mệnh, văn võ song toàn, quyền ấn cùng sáng, chủ cả đời cơm áo đầy đủ, địa vị cao. Sách xưa nói “Phủ Tướng triều viên, thiên chung thực lộc”, thường gặp ở giới chính trị, nhà quản lý doanh nghiệp.',
    palaces: [tianfu.name, tianxiang.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Phủ Tướng Triều Viên cách»',
  });
}

/** 阳梁昌禄：太阳+天梁+文昌+禄存四星会命宫，大贵格 */
function detectYangLiangChangLu(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('太阳') || !sanFangSet.has('天梁') ||
      !sanFangSet.has('文昌') || !sanFangSet.has('禄存')) return;

  const sun = findStarPalace(chart, '太阳')!;
  const liang = findStarPalace(chart, '天梁')!;
  const required = [
    'Thái Dương hội tam phương cung Mệnh',
    'Thiên Lương hội tam phương cung Mệnh',
    'Văn Xương hội tam phương cung Mệnh',
    'Lộc Tồn hội tam phương cung Mệnh',
  ];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (isBright(sun, '太阳')) bonus.push('Thái Dương Miếu Vượng');
  if (isBright(liang, '天梁')) bonus.push('Thiên Lương Miếu Vượng');
  if (sanFangSet.has('化科')) bonus.push('Lại hội Hóa Khoa');
  if (isDim(sun, '太阳')) breaking.push('Thái Dương hãm (Dương Lương mất sáng)');
  if (sanFangShaCount(chart, SHA_HARD) >= 2) breaking.push('Tam phương Sát nặng');

  patterns.push({
    name: 'Dương Lương Xương Lộc',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thái Dương, Thiên Lương, Văn Xương, Lộc Tồn bốn sao cùng hội tam phương cung Mệnh, gọi là “sao khoa cử”, chủ thanh quý hiển đạt, thi cử rất tốt, nên đi con đường học thuật, giáo dục, nghiên cứu, chứng chỉ chuyên môn, cả đời dễ thành danh.',
    palaces: [sun.name, liang.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Dương Lương Xương Lộc cách»',
  });
}

/** 火贪格 / 铃贪格：贪狼+火星 或 贪狼+铃星 同宫或会照 */
function detectHuoTanLingTan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const tan = findStarPalace(chart, '贪狼');
  if (!tan) return;
  const huo = findStarPalace(chart, '火星');
  const ling = findStarPalace(chart, '铃星');

  for (const [shaName, shaPalace] of [['火星', huo], ['铃星', ling]] as const) {
    if (!shaPalace) continue;
    const sameOrTrine =
      tan.branch === shaPalace.branch ||
      (tan.branch + 4) % 12 === shaPalace.branch ||
      (tan.branch + 8) % 12 === shaPalace.branch ||
      (tan.branch + 6) % 12 === shaPalace.branch;
    if (!sameOrTrine) continue;
    if (!isInSanFang(chart, tan.branch)) continue;

    const required = [`Tham Lang ${tan.branch === shaPalace.branch ? 'đồng cung' : 'hội chiếu'} ${vs(shaName)}`, 'Tham Lang hội chiếu tam phương cung Mệnh'];
    const bonus: string[] = [];
    const breaking: string[] = [];
    if (isBright(tan, '贪狼')) bonus.push('Tham Lang Miếu Vượng');
    if (getStarSiHua(tan, '贪狼') === '禄' || getStarSiHua(tan, '贪狼') === '权') bonus.push('Tham Lang Hóa Lộc/Hóa Quyền');
    if (hasShaInPalace(tan, ['擎羊', '陀罗'])) breaking.push('Cung Tham Lang lại gặp Kình Đà (phá sức bạo phát)');
    if (hasShaInPalace(tan, SHA_KONG)) breaking.push('Tham Lang gặp Không Kiếp (tiền đến tiền đi)');

    patterns.push({
      name: shaName === '火星' ? 'Hỏa Tham cách' : 'Linh Tham cách',
      level: breaking.length ? 'good' : 'excellent',
      description: `Tham Lang gặp ${vs(shaName)} ${tan.branch === shaPalace.branch ? 'đồng cung' : 'tam phương hội chiếu'}, chủ hoạnh tài bất ngờ, cơ hội đến đột ngột. Sách xưa nói “Tham Lang ngộ Hỏa Linh, tất phát hoạnh tài”, nhưng đến nhanh đi cũng nhanh, nên thấy tốt thì thu.${breaking.length ? 'Lá số này đã kích hoạt điều kiện phá cách, sức phát giảm đi.' : ''}`,
      palaces: [tan.name, shaPalace.name],
      conditions: { required, bonus, breaking },
      source: '«Tử Vi Đẩu Số Cốt Tủy Phú»',
    });
  }
}

/** 武贪格：武曲+贪狼 同宫（丑、未） 或 对照 */
function detectWuTan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const wu = findStarPalace(chart, '武曲');
  const tan = findStarPalace(chart, '贪狼');
  if (!wu || !tan) return;
  const sameOrOppose = wu.branch === tan.branch || (wu.branch + 6) % 12 === tan.branch;
  if (!sameOrOppose) return;
  if (!isInSanFang(chart, wu.branch) && !isInSanFang(chart, tan.branch)) return;

  const required = [
    wu.branch === tan.branch ? 'Vũ Khúc Tham Lang đồng cung (Sửu/Mùi)' : 'Vũ Khúc Tham Lang đối cung củng chiếu',
    'hội chiếu tam phương cung Mệnh',
  ];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('火星') || sanFangAllStars(chart).has('铃星'))
    bonus.push('Lại gặp Hỏa Tinh/Linh Tinh (Hỏa Tham/Linh Tham chồng lên)');
  if (getStarSiHua(wu, '武曲') === '禄') bonus.push('Vũ Khúc Hóa Lộc');
  if (hasShaInPalace(wu, ['擎羊', '陀罗'])) breaking.push('Cung Vũ Tham gặp Kình Đà');
  if (hasShaInPalace(wu, SHA_KONG)) breaking.push('Cung Vũ Tham gặp Không Kiếp');

  patterns.push({
    name: 'Vũ Tham cách',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Vũ Khúc Tham Lang hội Mệnh, tài tinh cùng sao đào hoa, dục vọng tỏa sáng; sách xưa nói “Vũ Tham bất phát thiếu niên nhân” — sau ba mươi tuổi mới tích lũy dày rồi bộc phát. Chủ đại phú đại quý từ trung niên trở đi, nguồn tài đến từ các mối quan hệ, xã giao, quản lý dục vọng; hợp tài chính, đầu cơ, bán hàng, giải trí.',
    palaces: [wu.name, tan.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Cốt Tủy Phú»',
  });
}

/** 杀破狼：七杀、破军、贪狼三方齐聚 */
function detectShaPoLang(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  const has = ['七杀', '破军', '贪狼'].filter(s => sanFangSet.has(s));
  if (has.length < 3) return;

  const required = ['Thất Sát, Phá Quân, Tham Lang ba sao cùng vào tam phương tứ chính cung Mệnh'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangSet.has('化禄') || sanFangSet.has('化权')) bonus.push('Tam phương có Hóa Lộc hoặc Hóa Quyền (động có lực)');
  if (sanFangSet.has('左辅') && sanFangSet.has('右弼')) bonus.push('Phù Bật cùng hội (trong biến động được quý nhân)');
  if (sanFangShaCount(chart, SHA_HARD) >= 3) breaking.push('Sát tinh quá nặng (động mà không thành)');
  if (hasShaInPalace(ming, SHA_KONG)) breaking.push('Mệnh tọa Không Kiếp (động mà vất vả)');

  patterns.push({
    name: 'Sát Phá Lang',
    level: breaking.length ? 'caution' : 'good',
    description: 'Thất Sát, Phá Quân, Tham Lang ba sao hội Mệnh, mệnh cách khai sáng xông pha. Cả đời nhiều biến động, không cam bình thường, nên khởi nghiệp, quân cảnh, kinh doanh, bán hàng. Sau trung niên mới ổn định giữ thành, thời trẻ dễ thất bại vì bốc đồng.',
    palaces: getSanFangPalaces(chart).filter(p => has.includes(getMajorStarNames(p)[0])).map(p => p.name),
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Sát Phá Lang»',
  });
}

/** 机月同梁：天机、太阴、天同、天梁四星齐入命迁财官 */
function detectJiYueTongLiang(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  const has = ['天机', '太阴', '天同', '天梁'].filter(s => sanFangSet.has(s));
  if (has.length < 4) return;

  const required = ['Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào tam phương tứ chính cung Mệnh'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangSet.has('文昌') || sanFangSet.has('文曲')) bonus.push('Lại hội Xương Khúc');
  if (sanFangSet.has('化科')) bonus.push('Lại hội Hóa Khoa');
  if (sanFangShaCount(chart, SHA_HARD) >= 3) breaking.push('Sát tinh quá nhiều (Cơ Nguyệt Đồng Lương kỵ Sát)');
  if (hasShaInPalace(ming, SHA_HARD)) breaking.push('Cung Mệnh tọa Sát');

  patterns.push({
    name: 'Cơ Nguyệt Đồng Lương',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc, nho nhã, thông minh giỏi mưu tính. Hợp nhất với công chức, học thuật, văn nghệ, y tế, dịch vụ — những ngành cần tích lũy ổn định, không nên mạo hiểm lớn hay đầu cơ lớn.',
    palaces: getSanFangPalaces(chart).filter(p => has.some(s => getMajorStarNames(p).includes(s))).map(p => p.name),
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Cơ Nguyệt Đồng Lương cách»',
  });
}

/** 廉贞天相：同宫 */
function detectLianXiang(chart: ZiweiChart, patterns: Pattern[]) {
  const lian = findStarPalace(chart, '廉贞');
  const xiang = findStarPalace(chart, '天相');
  if (!lian || !xiang || lian.branch !== xiang.branch) return;

  const inMing = lian.branch === chart.mingGongBranch;
  const required = ['Liêm Trinh Thiên Tướng đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (hasStar(lian, '禄存') || getStarSiHua(lian, '廉贞') === '禄') bonus.push('Gặp Lộc Tồn hoặc Liêm Trinh Hóa Lộc');
  if (sanFangAllStars(chart).has('左辅')) bonus.push('Tả Phù hội chiếu');
  if (hasShaInPalace(lian, ['擎羊'])) breaking.push('Cung Liêm Tướng có Kình Dương (khuynh hướng Liêm Sát Dương)');
  if (getStarSiHua(lian, '廉贞') === '忌') breaking.push('Liêm Trinh Hóa Kỵ');

  patterns.push({
    name: 'Liêm Trinh Thiên Tướng cách',
    level: breaking.length ? 'caution' : (inMing ? 'good' : 'neutral'),
    description: 'Liêm Trinh Thiên Tướng đồng cung, cách ấn thụ, chủ làm việc công bằng, nổi tiếng thanh liêm, nên làm công chức, quản lý hành chính, pháp vụ, kế hoạch. Sợ gặp Kình Dương Hóa Kỵ, ngược lại chủ kiện tụng.',
    palaces: [lian.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 武曲七杀：同宫，将星配财星 */
function detectWuQiSha(chart: ZiweiChart, patterns: Pattern[]) {
  const wu = findStarPalace(chart, '武曲');
  const qi = findStarPalace(chart, '七杀');
  if (!wu || !qi || wu.branch !== qi.branch) return;

  const inMing = wu.branch === chart.mingGongBranch;
  const required = ['Vũ Khúc Thất Sát đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (getStarSiHua(wu, '武曲') === '权') bonus.push('Vũ Khúc Hóa Quyền');
  if (getStarSiHua(wu, '武曲') === '禄') bonus.push('Vũ Khúc Hóa Lộc');
  if (getStarSiHua(wu, '武曲') === '忌') breaking.push('Vũ Khúc Hóa Kỵ (Vũ Khúc Hóa Kỵ là điềm tai họa về tiền)');
  if (hasShaInPalace(wu, ['擎羊', '陀罗', '火星', '铃星'])) breaking.push('Cung Vũ Sát Sát tinh quá nhiều');

  patterns.push({
    name: 'Vũ Khúc Thất Sát',
    level: breaking.length ? 'caution' : (inMing ? 'excellent' : 'good'),
    description: 'Vũ Khúc Thất Sát đồng cung, tướng tinh phối tài tinh, chủ quả quyết kiên cường, khả năng quản lý tiền bạc mạnh, hợp tài chính, quân cảnh, khởi nghiệp. Nhưng kỵ gặp Hóa Kỵ và Sát tinh, nếu không thì hung hiểm. Cả đời phấn đấu, tích của nhưng lo toan.',
    palaces: [wu.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 天同天梁：同宫 */
function detectTongLiang(chart: ZiweiChart, patterns: Pattern[]) {
  const tong = findStarPalace(chart, '天同');
  const liang = findStarPalace(chart, '天梁');
  if (!tong || !liang || tong.branch !== liang.branch) return;

  const required = ['Thiên Đồng Thiên Lương đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('文昌')) bonus.push('Văn Xương hội chiếu');
  if (getStarSiHua(tong, '天同') === '禄') bonus.push('Thiên Đồng Hóa Lộc');
  if (hasShaInPalace(tong, SHA_HARD)) breaking.push('Sát tinh đồng tọa');

  patterns.push({
    name: 'Thiên Đồng Thiên Lương cách',
    level: breaking.length ? 'neutral' : 'good',
    description: 'Thiên Đồng Thiên Lương đồng cung, phúc tinh và âm tinh cùng hội, chủ khoan hậu hòa thiện, thích giúp người, nên y tế, giáo dục, tôn giáo, công ích xã hội. Nhưng thiên về ôn hòa bảo thủ, khó thành cục đại phú đại quý.',
    palaces: [tong.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 日月同宫：太阳太阴丑或未宫同宫 */
function detectRiYueTongGong(chart: ZiweiChart, patterns: Pattern[]) {
  const sun = findStarPalace(chart, '太阳');
  const moon = findStarPalace(chart, '太阴');
  if (!sun || !moon || sun.branch !== moon.branch) return;
  if (sun.branch !== 1 && sun.branch !== 7) return;  // 必须丑(1) 或 未(7)

  const inMing = sun.branch === chart.mingGongBranch;
  const required = [`Thái Dương Thái Âm cùng nhập cung ${BRANCH_VI[BRANCH_NAMES[sun.branch]]}`];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sun.branch === 7) bonus.push('Nhật Nguyệt đồng huy ở cung Mùi (sách xưa nói Nhật Nguyệt ở cung Mùi song mỹ)');
  if (sanFangAllStars(chart).has('文昌') && sanFangAllStars(chart).has('文曲')) bonus.push('Xương Khúc hội chiếu');
  if (hasShaInPalace(sun, SHA_HARD)) breaking.push('Cung Nhật Nguyệt có Sát tinh đồng tọa');

  patterns.push({
    name: 'Nhật Nguyệt Đồng Cung',
    level: breaking.length ? 'good' : (inMing ? 'excellent' : 'good'),
    description: `Thái Dương Thái Âm đồng cung ở cung ${BRANCH_VI[BRANCH_NAMES[sun.branch]]}, âm dương cân bằng, văn võ song toàn. Chủ có duyên với người khác giới, sự nghiệp thuận lợi, danh tiếng lan xa. ${sun.branch === 7 ? 'Nhật Nguyệt ở cung Mùi song mỹ càng tốt.' : 'Nhật Nguyệt đồng cung ở cung Sửu lực khá bình thường.'}`,
    palaces: [sun.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 日月夹命：太阳太阴在命宫前后两宫 */
function detectRiYueJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const prevHasSun = hasStar(prev, '太阳');
  const prevHasMoon = hasStar(prev, '太阴');
  const nextHasSun = hasStar(next, '太阳');
  const nextHasMoon = hasStar(next, '太阴');
  const ok = (prevHasSun && nextHasMoon) || (prevHasMoon && nextHasSun);
  if (!ok) return;

  const sunPalace = prevHasSun ? prev : next;
  const moonPalace = prevHasMoon ? prev : next;
  const required = ['Thái Dương Thái Âm chia ở hai cung trước và sau cung Mệnh'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (isBright(sunPalace, '太阳')) bonus.push('Thái Dương Miếu Vượng');
  if (isBright(moonPalace, '太阴')) bonus.push('Thái Âm Miếu Vượng');
  if (isDim(sunPalace, '太阳') || isDim(moonPalace, '太阴')) breaking.push('Nhật Nguyệt hãm (giáp Mệnh mất sáng)');

  patterns.push({
    name: 'Nhật Nguyệt Giáp Mệnh',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thái Dương Thái Âm chia ở hai bên cung Mệnh giáp chiếu, quang minh lỗi lạc, cả đời được quý nhân giúp, sự nghiệp phát triển. Nam chủ quan quý, nữ chủ vượng phu hưng gia. Nhật Nguyệt phải không hãm mới là giáp thật.',
    palaces: [sunPalace.name, moonPalace.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Nhật Nguyệt Giáp Mệnh»',
  });
}

/** 巨日同宫：巨门太阳同入寅或申 */
function detectJuRiTongGong(chart: ZiweiChart, patterns: Pattern[]) {
  const ju = findStarPalace(chart, '巨门');
  const sun = findStarPalace(chart, '太阳');
  if (!ju || !sun || ju.branch !== sun.branch) return;
  if (ju.branch !== 2 && ju.branch !== 8) return;  // 必须寅(2) 或 申(8)

  const inMing = ju.branch === chart.mingGongBranch;
  const required = [`Cự Môn Thái Dương cùng nhập cung ${BRANCH_VI[BRANCH_NAMES[ju.branch]]}`];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (ju.branch === 2) bonus.push('Thái Dương Miếu Vượng ở cung Dần, Cự Môn nhờ ánh mặt trời hóa giải thị phi');
  if (getStarSiHua(ju, '巨门') === '禄' || getStarSiHua(ju, '巨门') === '权') bonus.push('Cự Môn Hóa Lộc/Hóa Quyền (tài ăn nói sinh tiền)');
  if (getStarSiHua(ju, '巨门') === '忌') breaking.push('Cự Môn Hóa Kỵ (khẩu thiệt kiện tụng)');
  if (ju.branch === 8) breaking.push('Thái Dương ở cung Thân đã xế tây, ám diệu của Cự Môn càng lộ');

  patterns.push({
    name: 'Cự Nhật Đồng Cung',
    level: breaking.length ? 'caution' : (inMing && ju.branch === 2 ? 'excellent' : 'good'),
    description: `Cự Môn Thái Dương đồng cung ở cung ${BRANCH_VI[BRANCH_NAMES[ju.branch]]}, Thái Dương hóa giải ám diệu của Cự Môn, chủ lập nghiệp bằng tài ăn nói, truyền thông, ngoại ngữ, chuyên môn. Cung Dần là tốt, cung Thân lực giảm. Sợ Cự Môn Hóa Kỵ thì kiện tụng.`,
    palaces: [ju.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Cự Nhật Đồng Cung»',
  });
}

/** 石中隐玉：巨门入命于子午宫 */
function detectShiZhongYinYu(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (!hasStar(ming, '巨门')) return;
  if (ming.branch !== 0 && ming.branch !== 6) return;  // 子(0) 或 午(6)

  const required = [`Cự Môn nhập Mệnh ở cung ${BRANCH_VI[BRANCH_NAMES[ming.branch]]}`];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (getStarSiHua(ming, '巨门') === '禄' || getStarSiHua(ming, '巨门') === '权') bonus.push('Cự Môn Hóa Lộc/Hóa Quyền');
  if (sanFangAllStars(chart).has('文昌')) bonus.push('Văn Xương hội chiếu (ngọc ẩn trong đá được sáng)');
  if (getStarSiHua(ming, '巨门') === '忌') breaking.push('Cự Môn Hóa Kỵ (ngọc chôn trong bùn sâu)');
  if (hasShaInPalace(ming, SHA_HARD)) breaking.push('Mệnh tọa Sát tinh');

  patterns.push({
    name: 'Thạch Trung Ẩn Ngọc',
    level: breaking.length ? 'caution' : 'excellent',
    description: 'Cự Môn tọa Mệnh ở Tý Ngọ, bề ngoài bình thường mà bên trong chứa tài học. Thuở nhỏ âm thầm vô danh, trung niên mới lộ quý khí, nên đi chuyên môn, nghiên cứu, ăn nói, truyền thông. Cần có Lộc Quyền hoặc Văn Xương giúp mới “đục đá thấy ngọc”.',
    palaces: ['命宫'],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Cốt Tủy Phú · Thạch Trung Ẩn Ngọc»',
  });
}

/** 明珠出海：命宫在未空宫，对宫丑宫为太阳太阴 */
function detectMingZhuChuHai(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (ming.branch !== 7) return;   // 命在未
  if (getMajorStarNames(ming).length > 0) return;   // 命宫为空宫
  const dui = getDuiGong(chart, ming.branch);
  if (!dui) return;
  if (!hasStar(dui, '太阳') || !hasStar(dui, '太阴')) return;

  const required = ['Cung Mệnh ở Mùi là cung trống', 'Đối cung Sửu có Thái Dương Thái Âm đồng độ'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('文昌') || sanFangAllStars(chart).has('文曲')) bonus.push('Lại hội Xương Khúc');
  if (sanFangAllStars(chart).has('左辅') || sanFangAllStars(chart).has('右弼')) bonus.push('Phù Bật tương trợ');
  if (sanFangShaCount(chart, SHA_HARD) >= 2) breaking.push('Sát tinh hội chiếu (ánh ngọc mờ đi)');

  patterns.push({
    name: 'Minh Châu Xuất Hải',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Mệnh ở Mùi là cung trống, đối cung Sửu Nhật Nguyệt đồng huy củng chiếu, gọi là “Minh Châu Xuất Hải”. Chủ xuất thân bình thường, về sau nỗ lực mà nổi lên, nên đi xa lập nghiệp, nghiên cứu học thuật hoặc chức cao ở công ty lớn, chủ đại phú đại quý.',
    palaces: ['命宫', dui.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Tập · Minh Châu Xuất Hải»',
  });
}

/** 紫微独坐入命 */
function detectZiWeiInMing(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (!hasStar(ming, '紫微') || hasStar(ming, '天府')) return;

  const required = ['Tử Vi độc tọa cung Mệnh (không có Thiên Phủ đồng tọa)'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  const sanFangSet = sanFangAllStars(chart);
  if (sanFangSet.has('左辅') && sanFangSet.has('右弼')) bonus.push('Tả Phù Hữu Bật cùng hội');
  if (sanFangSet.has('文昌') && sanFangSet.has('文曲')) bonus.push('Văn Xương Văn Khúc cùng hội');
  if (!sanFangSet.has('左辅') && !sanFangSet.has('右弼')) breaking.push('Không có Phù Bật (cô quân vô thần)');
  if (hasShaInPalace(ming, SHA_KONG)) breaking.push('Tử Vi gặp Không Kiếp (sách xưa kỵ nhất)');

  patterns.push({
    name: 'Tử Vi nhập Mệnh',
    level: breaking.length ? 'caution' : (bonus.length ? 'excellent' : 'good'),
    description: 'Tử Vi độc tọa cung Mệnh, đế tinh, tự tôn mạnh, có sức hút lãnh đạo. Nhưng Tử Vi kỵ nhất “cô quân ngoài đồng” — nếu không có Tả Phù Hữu Bật tương hội, ngược lại thành cao ngạo cô độc, dễ bị phỉ báng.',
    palaces: ['命宫'],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 辅弼夹命 */
function detectFuBiJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const prevHasZuo = hasStar(prev, '左辅');
  const prevHasYou = hasStar(prev, '右弼');
  const nextHasZuo = hasStar(next, '左辅');
  const nextHasYou = hasStar(next, '右弼');
  if (!((prevHasZuo && nextHasYou) || (prevHasYou && nextHasZuo))) return;

  const required = ['Tả Phù Hữu Bật chia ở hai cung trước và sau cung Mệnh'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('天魁') || sanFangAllStars(chart).has('天钺')) bonus.push('Lại hội Khôi Việt');

  patterns.push({
    name: 'Phù Bật Giáp Mệnh',
    level: 'excellent',
    description: 'Tả Phù Hữu Bật giáp Mệnh, lý luận truyền thống cho rằng cách này tượng trưng cho quý nhân giúp đỡ và phúc dày. Hợp với con đường quan trường, quản lý doanh nghiệp lớn — những hướng phát huy tài tổ chức. Sách xưa nói “Tả Phù Hữu Bật, chung thân phúc hậu” — nhấn mạnh ưu thế của cách này trong điều phối tổ chức.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Phù Bật Giáp Mệnh»',
  });
}

/** 昌曲夹命 */
function detectChangQuJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const prevHasChang = hasStar(prev, '文昌');
  const prevHasQu = hasStar(prev, '文曲');
  const nextHasChang = hasStar(next, '文昌');
  const nextHasQu = hasStar(next, '文曲');
  if (!((prevHasChang && nextHasQu) || (prevHasQu && nextHasChang))) return;

  patterns.push({
    name: 'Xương Khúc Giáp Mệnh',
    level: 'excellent',
    description: 'Văn Xương Văn Khúc giáp cung Mệnh, chủ thông minh tuấn tú, văn chương rực rỡ, nên đi văn giáo, học thuật, nghệ thuật, viết lách. Sách xưa nói “Xương Khúc giáp Mệnh chủ khoa giáp”, lợi nhất cho thi cử.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Văn Xương Văn Khúc chia ở hai cung trước và sau cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 魁钺夹命 */
function detectKuiYueJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const okA = hasStar(prev, '天魁') && hasStar(next, '天钺');
  const okB = hasStar(prev, '天钺') && hasStar(next, '天魁');
  if (!okA && !okB) return;

  patterns.push({
    name: 'Khôi Việt Giáp Mệnh',
    level: 'good',
    description: 'Thiên Khôi Thiên Việt giáp Mệnh, nam gọi Thiên Ất, nữ gọi Ngọc Đường, cả đời được quý nhân nâng đỡ. Khi thi cử, tìm việc, lúc then chốt thường có quý nhân bất ngờ giúp đỡ.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Thiên Khôi Thiên Việt chia ở hai cung trước và sau cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 双禄朝垣：化禄 + 禄存 同会三方 */
function detectShuangLuChaoYuan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFang = getSanFangPalaces(chart);
  let huaLuFound = false;
  let luCunFound = false;
  for (const p of sanFang) {
    if (p.stars.some(s => s.siHua === '禄')) huaLuFound = true;
    if (hasStar(p, '禄存')) luCunFound = true;
  }
  if (!huaLuFound || !luCunFound) return;

  patterns.push({
    name: 'Song Lộc Triều Viên',
    level: 'excellent',
    description: 'Hóa Lộc, Lộc Tồn cùng hội tam phương tứ chính cung Mệnh, nguồn tài tuôn chảy, cơm áo đầy đủ. Sách xưa nói “Song Lộc triều viên, giàu sánh Đào Chu”, chủ cả đời không lo tiền, thường được cả chính tài lẫn hoạnh tài.',
    palaces: sanFang.map(p => p.name),
    conditions: {
      required: ['Hóa Lộc hội chiếu tam phương tứ chính', 'Lộc Tồn hội chiếu tam phương tứ chính'],
      breaking: hasShaInPalace(ming, SHA_KONG) ? ['Mệnh tọa Không Kiếp (Song Lộc gặp Không, tiền đến tiền đi)'] : undefined,
    },
    source: '«Tử Vi Đẩu Số Toàn Thư · Song Lộc Triều Viên»',
  });
}

/** 三奇加会：化禄 化权 化科 同会三方 */
function detectSanQiJiaHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangPalaces = getSanFangPalaces(chart);
  let lu = false, quan = false, ke = false;
  for (const p of sanFangPalaces) {
    for (const s of p.stars) {
      if (s.siHua === '禄') lu = true;
      if (s.siHua === '权') quan = true;
      if (s.siHua === '科') ke = true;
    }
  }
  if (!(lu && quan && ke)) return;

  patterns.push({
    name: 'Tam Kỳ Gia Hội',
    level: 'excellent',
    description: 'Hóa Lộc, Hóa Quyền, Hóa Khoa ba cát hóa cùng hội tam phương tứ chính cung Mệnh, gọi là “Tam Kỳ Gia Hội”. Chủ cả đời công danh, tài phú, quý nhân đều đủ, là một trong những cát cách cao nhất của Tử Vi Đẩu Số.',
    palaces: sanFangPalaces.map(p => p.name),
    conditions: { required: ['Hóa Lộc, Hóa Quyền, Hóa Khoa ba cát hóa cùng hội tam phương tứ chính cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tam Kỳ Gia Hội»',
  });
}

/** 化禄入命/官/财 */
function detectHuaLuRuMing(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const huaLuStar = ming.stars.find(s => s.siHua === '禄' && s.type === 'major');
  if (!huaLuStar) return;

  patterns.push({
    name: `${vs(huaLuStar.name)} Hóa Lộc nhập Mệnh`,
    level: 'good',
    description: `${vs(huaLuStar.name)} Hóa Lộc tọa Mệnh, chủ sinh tài thuận lợi, nhân duyên tốt, nhiều cơ hội. ${huaLuStar.name === '武曲' ? 'Vũ Khúc Hóa Lộc thuộc chính tài, hợp thực nghiệp, tài chính.' : huaLuStar.name === '太阴' ? 'Thái Âm Hóa Lộc thuộc âm tài, bất động sản.' : huaLuStar.name === '贪狼' ? 'Tham Lang Hóa Lộc thuộc tài nhờ quan hệ, tài đào hoa.' : ''}`,
    palaces: ['命宫'],
    conditions: { required: [`${vs(huaLuStar.name)} Hóa Lộc tọa cung Mệnh`] },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

// ────────────────── 恶格识别器 ──────────────────

/** 化忌入命/迁 */
function detectHuaJiRuMingQian(chart: ZiweiChart, patterns: Pattern[]) {
  const qianBranch = (chart.mingGongBranch + 6) % 12;
  for (const palace of chart.palaces) {
    if (palace.branch !== chart.mingGongBranch && palace.branch !== qianBranch) continue;
    const jiStar = palace.stars.find(s => s.siHua === '忌' && s.type === 'major');
    if (!jiStar) continue;

    const inMing = palace.branch === chart.mingGongBranch;
    patterns.push({
      name: `${vs(jiStar.name)} Hóa Kỵ nhập ${inMing ? 'Mệnh' : 'Thiên Di'}`,
      level: 'caution',
      description: inMing
        ? `${vs(jiStar.name)} Hóa Kỵ tọa cung Mệnh, cần lưu ý tính cố chấp của bản thân, trở ngại tâm lý hoặc nguy cơ sức khỏe, việc gì cũng lùi một bước mà nghĩ. Hóa Kỵ không nhất thiết xấu, chỉ nghĩa là năng lượng của sao này cần được đặc biệt chú ý.`
        : `${vs(jiStar.name)} Hóa Kỵ tọa cung Thiên Di, ra ngoài, đi xa, quan hệ giao tiếp dễ trắc trở, nên giữ không nên động.`,
      palaces: [palace.name],
      conditions: { required: [`${vs(jiStar.name)} Hóa Kỵ tọa cung ${inMing ? 'Mệnh' : 'Thiên Di'}`] },
      source: '«Tử Vi Đẩu Số Toàn Thư»',
    });
  }
}

/** 羊陀夹忌：化忌坐宫，左右被擎羊陀罗夹 */
function detectYangTuoJiaJi(chart: ZiweiChart, patterns: Pattern[]) {
  for (const palace of chart.palaces) {
    const jiStar = palace.stars.find(s => s.siHua === '忌');
    if (!jiStar) continue;
    if (palace.branch !== chart.mingGongBranch) continue;   // 只看命宫被夹

    const { prev, next } = getJiaPalaces(chart, palace.branch);
    if (!prev || !next) continue;
    const aPrev = hasStar(prev, '擎羊') && hasStar(next, '陀罗');
    const aNext = hasStar(prev, '陀罗') && hasStar(next, '擎羊');
    if (!aPrev && !aNext) continue;

    patterns.push({
      name: 'Dương Đà Giáp Kỵ',
      level: 'caution',
      description: 'Hóa Kỵ tọa Mệnh, Kình Dương Đà La giáp hai bên, sách xưa nói “Dương Đà giáp Kỵ là bại cục”, chủ cả đời lao lực bôn ba, gập ghềnh không thuận, thân tâm mệt mỏi. Cần lấy tu dưỡng đức hạnh và tích cực làm việc để hóa giải, mọi việc thận trọng là trên hết.',
      palaces: ['命宫', prev.name, next.name],
      conditions: { required: ['Hóa Kỵ tọa Mệnh', 'Kình Dương Đà La chia ở hai cung trước và sau cung Mệnh'] },
      source: '«Tử Vi Đẩu Số Cốt Tủy Phú · Dương Đà Giáp Kỵ»',
    });
    return;
  }
}

/** 火铃夹命：火星铃星分居命宫前后 */
function detectHuoLingJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const okA = hasStar(prev, '火星') && hasStar(next, '铃星');
  const okB = hasStar(prev, '铃星') && hasStar(next, '火星');
  if (!okA && !okB) return;

  patterns.push({
    name: 'Hỏa Linh Giáp Mệnh',
    level: 'caution',
    description: 'Hỏa Tinh Linh Tinh chia ở hai cung trước và sau cung Mệnh giáp Mệnh, chủ nóng tính, dễ bốc đồng, dễ gặp việc bất ngờ hoặc tranh chấp. Cần rèn tính kiên nhẫn, tránh quyết định bốc đồng.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Hỏa Tinh Linh Tinh chia ở hai cung trước và sau cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 空劫夹命：地空地劫分居命宫前后 */
function detectKongJieJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const okA = hasStar(prev, '地空') && hasStar(next, '地劫');
  const okB = hasStar(prev, '地劫') && hasStar(next, '地空');
  if (!okA && !okB) return;

  patterns.push({
    name: 'Không Kiếp Giáp Mệnh',
    level: 'caution',
    description: 'Địa Không Địa Kiếp giáp Mệnh, chủ tiền đến tiền đi, tư tưởng thoát tục, dễ đi vào tôn giáo triết học. Sách xưa nói “Không Kiếp giáp Mệnh, tài bất tụ”. Hợp nghề kỹ nghệ, tôn giáo, nghiên cứu — những nghề không coi trọng vật chất.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Địa Không Địa Kiếp chia ở hai cung trước và sau cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư»',
  });
}

/** 廉杀羊：廉贞、七杀、擎羊三星会照（流年大限最凶） */
function detectLianShaYang(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!(sanFangSet.has('廉贞') && sanFangSet.has('七杀') && sanFangSet.has('擎羊'))) return;

  patterns.push({
    name: 'Liêm Sát Dương',
    level: 'caution',
    description: 'Liêm Trinh, Thất Sát, Kình Dương ba sao hội chiếu tam phương cung Mệnh, trong lý luận truyền thống được đánh dấu là tổ hợp cần đặc biệt chú ý. Khi cách này bị kích hoạt ở Đại hạn Lưu niên, nhắc nên giữ thái độ thận trọng: an toàn khi lái xe, hòa thuận trong quan hệ, quyết định y tế cần lý trí — nhấn mạnh chủ động quản lý chứ không phải định mệnh tiêu cực.',
    palaces: ['命宫'],
    conditions: { required: ['Liêm Trinh, Thất Sát, Kình Dương ba sao hội chiếu tam phương tứ chính'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Liêm Sát Dương»',
  });
}

/** 巨火羊：巨门、火星、擎羊会照 */
function detectJuHuoYang(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!(sanFangSet.has('巨门') && sanFangSet.has('火星') && sanFangSet.has('擎羊'))) return;

  patterns.push({
    name: 'Cự Hỏa Dương',
    level: 'caution',
    description: 'Cự Môn, Hỏa Tinh, Kình Dương ba sao hội chiếu, cổ tịch truyền thống ghi cách này là tổ hợp cần cảnh giác (câu cổ “chung thân ách tử” là cách nói định mệnh luận, nay không còn phù hợp). Hiểu theo hiện đại: tổ hợp này tượng trưng cho việc nói thẳng dễ gây xung đột, lúc cảm xúc mạnh cần tự quan sát. Hướng tu dưỡng: tập diễn đạt ôn hòa, chủ động hóa giải đối lập, rèn quản lý cảm xúc.',
    palaces: ['命宫'],
    conditions: { required: ['Cự Môn, Hỏa Tinh, Kình Dương ba sao hội chiếu tam phương tứ chính'] },
    source: '«Tử Vi Đẩu Số Cốt Tủy Phú · Cự Hỏa Dương»',
  });
}

/** 铃昌陀武：铃星、文昌、陀罗、武曲会照（限至投河） */
function detectLingChangTuoWu(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!(sanFangSet.has('铃星') && sanFangSet.has('文昌') && sanFangSet.has('陀罗') && sanFangSet.has('武曲'))) return;

  patterns.push({
    name: 'Linh Xương Đà Vũ',
    level: 'caution',
    description: 'Linh Tinh, Văn Xương, Đà La, Vũ Khúc bốn sao cùng hội, cổ tịch truyền thống ghi đây là tổ hợp cần đặc biệt chú ý (câu cổ “hạn chí đầu hà” là cách nói định mệnh luận, không phải cách hiểu hiện đại). Gợi ý hiện đại: khi tổ hợp này bị kích hoạt ở Đại hạn Lưu niên, nhắc nên xử lý các quyết định lớn một cách lý trí, chú ý biến động cảm xúc, giữ cuộc sống ổn định — nhấn mạnh chủ động quản lý chứ không bị động chờ đợi.',
    palaces: ['命宫'],
    conditions: { required: ['Linh Tinh, Văn Xương, Đà La, Vũ Khúc bốn sao hội chiếu tam phương tứ chính'] },
    source: '«Tử Vi Đẩu Số Cốt Tủy Phú · Linh Xương Đà Vũ»',
  });
}

/** 马头带箭：擎羊在午宫坐命 */
function detectMaTouDaiJian(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (ming.branch !== 6) return;   // 必须午
  if (!hasStar(ming, '擎羊')) return;

  const required = ['Kình Dương tọa Mệnh ở cung Ngọ'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('七杀') || sanFangAllStars(chart).has('破军')) bonus.push('Lại hội Thất Sát hoặc Phá Quân (võ chức đại quý)');
  if (sanFangAllStars(chart).has('天魁') || sanFangAllStars(chart).has('天钺')) bonus.push('Khôi Việt chiếu thêm');

  patterns.push({
    name: 'Mã Đầu Đới Tiễn',
    level: bonus.length ? 'good' : 'caution',
    description: 'Kình Dương tọa Mệnh ở cung Ngọ, gọi là “Mã Đầu Đới Tiễn”, sách xưa nói “uy trấn biên cương”. Cách này tượng trưng cho sức hành động quyết đoán và tinh thần cạnh tranh, hợp hướng nghề cần năng lực thực thi và quyết định táo bạo. Lý luận truyền thống cũng nhắc cách này cần phối hợp cát tinh mới phát huy tốt nhất — nhấn mạnh ảnh hưởng của tổ hợp chứ không luận riêng một sao.',
    palaces: ['命宫'],
    conditions: { required, bonus },
    source: '«Tử Vi Đẩu Số Cốt Tủy Phú · Mã Đầu Đới Tiễn»',
  });
}

// ────────────────── 基础格局（提升识别覆盖率）──────────────────
// 设计：让普通命盘也能识别出 1-3 个常见格局，而不是 30+ 严格古书格局都不匹配。
// 这些都是单一条件触发的轻量识别，level 多为 neutral / good。

/** 禄存守身：禄存入身宫（或命宫与身宫同宫） */
function detectLuCunShouShen(chart: ZiweiChart, patterns: Pattern[]) {
  const luCunPalace = findStarPalace(chart, '禄存');
  if (!luCunPalace) return;
  const inMing = luCunPalace.branch === chart.mingGongBranch;
  const inShen = luCunPalace.branch === chart.shenGongBranch;
  if (!inMing && !inShen) return;
  patterns.push({
    name: inMing ? 'Lộc Tồn Thủ Mệnh' : 'Lộc Tồn Thủ Thân',
    level: 'good',
    description: inMing
      ? 'Lộc Tồn tọa Mệnh, chủ cả đời cơm áo không lo, tài lộc ổn định. Tính cách bảo thủ, giỏi tích lũy, nhưng Dương Đà giáp Lộc phải đề phòng tiểu nhân. Hợp nhất khi phối Hóa Lộc, Tả Phù Hữu Bật mới thành đại cách.'
      : 'Lộc Tồn vào cung Thân, chủ sau trung niên nguồn tài ổn định, có lộc tự hưởng. Thầy Nghê nói “Lộc Tồn nhập Thân, tài khí gần thân” — bạn đời hoặc hướng sự nghiệp có thể mang lại tài lộc ổn định.',
    palaces: [inMing ? '命宫' : '身宫'],
    conditions: { required: [inMing ? 'Lộc Tồn vào cung Mệnh' : 'Lộc Tồn vào cung Thân'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Lộc Tồn tinh»',
  });
}

/** 天马入命/迁：驿马星动 */
function detectTianMaRuMing(chart: ZiweiChart, patterns: Pattern[]) {
  const tianMaPalace = findStarPalace(chart, '天马');
  if (!tianMaPalace) return;
  const inMing = tianMaPalace.branch === chart.mingGongBranch;
  const inQian = tianMaPalace.branch === ((chart.mingGongBranch + 6) % 12);
  if (!inMing && !inQian) return;
  patterns.push({
    name: inMing ? 'Thiên Mã Nhập Mệnh' : 'Thiên Mã Tại Thiên Di',
    level: 'neutral',
    description: inMing
      ? 'Thiên Mã tọa Mệnh, chủ cả đời bôn ba, trong động mà được tiền, nên đi con đường thương lữ, làm việc bên ngoài, phát triển liên ngành. Thầy Nghê nói “Thiên Mã nhập Mệnh, vô Lộc bất phát” — nếu lại hội Lộc Tồn hoặc Hóa Lộc thì thành phú cách “Lộc Mã Giao Trì”.'
      : 'Thiên Mã ở cung Thiên Di, chủ ra ngoài có lợi, đi xa được tiền, nên phát triển nơi đất khách. Phối Hóa Lộc chủ sinh tài nơi xa, phối Sát tinh thì đường đi nhiều trắc trở.',
    palaces: [tianMaPalace.name],
    conditions: { required: [inMing ? 'Thiên Mã vào cung Mệnh' : 'Thiên Mã vào cung Thiên Di'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Thiên Mã tinh»',
  });
}

/** 化禄入财：财帛宫主星化禄 */
function detectHuaLuRuCai(chart: ZiweiChart, patterns: Pattern[]) {
  const cai = chart.palaces.find(p => p.name === '财帛');
  if (!cai) return;
  const luStar = cai.stars.find(s => s.type === 'major' && s.siHua === '禄');
  if (!luStar) return;
  patterns.push({
    name: 'Hóa Lộc Nhập Tài',
    level: 'good',
    description: `${vs(luStar.name)} Hóa Lộc nhập cung Tài Bạch, chủ nguồn tài thông suốt, thu nhập ổn định. Thầy Nghê nói Hóa Lộc là biểu tượng của “chính tài” — năng lực mà sao Hóa Lộc này đại diện (đặc chất cốt lõi của ${vs(luStar.name)}) là trục kiếm tiền chính của bạn. Phối Lộc Tồn hoặc Thiên Mã thì nguồn tài càng rộng.`,
    palaces: ['财帛'],
    conditions: { required: [`${vs(luStar.name)} Hóa Lộc nhập cung Tài Bạch`] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa luận»',
  });
}

/** 化权入官：官禄宫主星化权 */
function detectHuaQuanRuGuan(chart: ZiweiChart, patterns: Pattern[]) {
  const guan = chart.palaces.find(p => p.name === '官禄');
  if (!guan) return;
  const quanStar = guan.stars.find(s => s.type === 'major' && s.siHua === '权');
  if (!quanStar) return;
  patterns.push({
    name: 'Hóa Quyền Nhập Quan',
    level: 'good',
    description: `${vs(quanStar.name)} Hóa Quyền nhập cung Quan Lộc, chủ sự nghiệp có sức nắm quyền, đảm đương được vị trí độc lập một phương. Hóa Quyền đại diện quyền lực và năng lực thực thi — ${vs(quanStar.name)} Hóa Quyền cho thấy bạn có thể là người ra quyết định hoặc cốt cán thực thi trong sự nghiệp, nên đi con đường quản lý hoặc uy tín kỹ thuật.`,
    palaces: ['官禄'],
    conditions: { required: [`${vs(quanStar.name)} Hóa Quyền nhập cung Quan Lộc`] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa luận»',
  });
}

/** 化科入命/身：科名加身 */
function detectHuaKeRuMingShen(chart: ZiweiChart, patterns: Pattern[]) {
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const shen = chart.palaces.find(p => p.branch === chart.shenGongBranch);
  const target = [ming, shen].filter((p): p is Palace => Boolean(p));
  for (const p of target) {
    const keStar = p.stars.find(s => s.type === 'major' && s.siHua === '科');
    if (!keStar) continue;
    const isMing = p.branch === chart.mingGongBranch;
    patterns.push({
      name: isMing ? 'Hóa Khoa Nhập Mệnh' : 'Hóa Khoa Nhập Thân',
      level: 'good',
      description: `${vs(keStar.name)} Hóa Khoa nhập cung ${isMing ? 'Mệnh' : 'Thân'}, chủ vận danh tiếng, văn thư, học thuật. Thầy Nghê nói Hóa Khoa là “quý nhân tinh” — ${vs(keStar.name)} Hóa Khoa mang lại đặc chất được người khác coi trọng, nên làm văn thư, giáo dục, nghiên cứu, tư vấn, sáng tạo văn hóa — hướng “lấy danh sinh lợi”.`,
      palaces: [isMing ? '命宫' : '身宫'],
      conditions: { required: [`${vs(keStar.name)} Hóa Khoa nhập cung ${isMing ? 'Mệnh' : 'Thân'}`] },
      source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa luận»',
    });
    return; // 命和身重复时只识别一次
  }
}

/** 机月同梁三星会（3 星不全格，非四星真格）：天机/太阴/天同/天梁 任 3 星齐入三方四正 */
function detectJiYueTongLiangPartial(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  const has = ['天机', '太阴', '天同', '天梁'].filter(s => sanFangSet.has(s));
  if (has.length !== 3) return; // 4 星齐由 detectJiYueTongLiang 处理
  // 避免和上面 detectJiYueTongLiang 重复（4 星齐的不进这里）
  const missing = ['天机', '太阴', '天同', '天梁'].filter(s => !sanFangSet.has(s));
  patterns.push({
    name: 'Cơ Nguyệt Đồng Lương Tam Tinh Hội',
    level: 'neutral',
    description: `Cơ Nguyệt Đồng Lương cần Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng hội tam phương tứ chính mới là chân cách trọn vẹn; lá số này chỉ hội đủ 3 sao (${has.map(vs).join(', ')}), thiếu ${missing.map(vs).join(', ')} chưa hội, không phải chân cách trọn vẹn, lực giảm một bậc. Nho nhã có mưu, hợp công chức, nghiên cứu giảng dạy, y tế, dịch vụ — những ngành dựa vào tích lũy và ổn định; mấu chốt là xem sự phối hợp giữa sao khuyết và Tứ Hóa.`,
    palaces: getSanFangPalaces(chart).filter(p => has.some(s => getMajorStarNames(p).includes(s))).map(p => p.name),
    conditions: { required: [`Tam phương tứ chính hội ${has.map(vs).join(', ')} (Cơ Nguyệt Đồng Lương thiếu ${missing.map(vs).join(', ')})`] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Cơ Nguyệt Đồng Lương cách»',
  });
  void ming;
}

/** 昌曲同会：文昌+文曲都在命三方四正 */
function detectChangQuTongHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('文昌') || !sanFangSet.has('文曲')) return;
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  if (!ming) return;
  const inMing = hasStar(ming, '文昌') && hasStar(ming, '文曲');
  patterns.push({
    name: inMing ? 'Xương Khúc Tọa Mệnh' : 'Xương Khúc Đồng Hội',
    level: 'good',
    description: inMing
      ? 'Văn Xương Văn Khúc cùng vào cung Mệnh, chủ thông minh tuấn tú, văn chương rực rỡ, hợp văn học, giáo dục, viết lách, tư vấn. Kỵ nhất Hóa Kỵ — Xương Khúc Hóa Kỵ chủ thiệt ngầm về văn thư, hợp đồng.'
      : 'Văn Xương Văn Khúc cùng hội tam phương tứ chính, chủ tài hoa tràn đầy, ăn nói và văn bút đều giỏi. Nên đi nghề cần diễn đạt và văn chương, có Hóa Khoa trợ giúp thì danh tiếng nổi bật.',
    palaces: ['命宫'],
    conditions: { required: ['Văn Xương, Văn Khúc cùng hội tam phương tứ chính cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Văn Tinh luận»',
  });
}

/** 辅弼同会：左辅+右弼都在命三方四正 */
function detectFuBiTongHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('左辅') || !sanFangSet.has('右弼')) return;
  patterns.push({
    name: 'Phù Bật Đồng Hội',
    level: 'good',
    description: 'Tả Phù Hữu Bật cùng hội tam phương tứ chính cung Mệnh, chủ cả đời quý nhân không dứt, nhân duyên rất tốt. Hợp nhất với vị trí lãnh đạo và công việc làm việc nhóm. Thầy Nghê nói “Phù Bật giáp Mệnh, bình sinh quý nhân đa” — bạn không phải mệnh đơn thương độc mã, cần biết dùng mạng lưới quan hệ.',
    palaces: ['命宫'],
    conditions: { required: ['Tả Phù, Hữu Bật cùng hội tam phương tứ chính cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Phù Bật luận»',
  });
}

/** 魁钺同会：天魁+天钺都在命三方四正 */
function detectKuiYueTongHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('天魁') || !sanFangSet.has('天钺')) return;
  patterns.push({
    name: 'Khôi Việt Đồng Hội',
    level: 'good',
    description: 'Thiên Khôi Thiên Việt cùng hội tam phương tứ chính cung Mệnh, chủ có “Thiên Ất quý nhân” phù trợ, lúc then chốt luôn có quý nhân nâng đỡ. Thầy Nghê nói “Khôi Việt giáp Mệnh, tất là quý nhân” — khi gặp khó khăn sẽ có người đắc lực xuất hiện giúp đỡ, nên chủ động giữ gìn quan hệ.',
    palaces: ['命宫'],
    conditions: { required: ['Thiên Khôi, Thiên Việt cùng hội tam phương tứ chính cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Khôi Việt luận»',
  });
}

/** 科权双会：化科 + 化权 同会三方四正 */
function detectKeQuanShuangHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sfPalaces = getSanFangPalaces(chart);
  let hasKe = false, hasQuan = false;
  for (const p of sfPalaces) {
    for (const s of p.stars) {
      if (s.type === 'major' && s.siHua === '科') hasKe = true;
      if (s.type === 'major' && s.siHua === '权') hasQuan = true;
    }
  }
  if (!hasKe || !hasQuan) return;
  patterns.push({
    name: 'Khoa Quyền Song Hội',
    level: 'good',
    description: 'Hóa Khoa + Hóa Quyền cùng hội tam phương tứ chính, chủ danh và quyền song mỹ — vừa có học thức/danh tiếng (Khoa), vừa có sức nắm quyền (Quyền), nên đi con đường “uy tín chuyên môn” (như bác sĩ, luật sư, giáo sư, cốt cán kỹ thuật), danh lợi song thu và nền tảng vững chắc.',
    palaces: ['命宫'],
    conditions: { required: ['Hóa Khoa, Hóa Quyền cùng hội tam phương tứ chính cung Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa hội chiếu»',
  });
}

// ────────────────── 主入口 ──────────────────
export function detectPatterns(chart: ZiweiChart): Pattern[] {
  const patterns: Pattern[] = [];
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  if (!ming) return patterns;

  // 上格
  detectJunChenQingHui(chart, ming, patterns);
  detectZiFu(chart, ming, patterns);
  detectFuXiangChaoYuan(chart, ming, patterns);
  detectYangLiangChangLu(chart, ming, patterns);
  detectHuoTanLingTan(chart, ming, patterns);
  detectWuTan(chart, ming, patterns);
  detectShaPoLang(chart, ming, patterns);
  detectJiYueTongLiang(chart, ming, patterns);

  // 中格
  detectLianXiang(chart, patterns);
  detectWuQiSha(chart, patterns);
  detectTongLiang(chart, patterns);
  detectRiYueTongGong(chart, patterns);
  detectRiYueJiaMing(chart, patterns);
  detectJuRiTongGong(chart, patterns);
  detectShiZhongYinYu(chart, ming, patterns);
  detectMingZhuChuHai(chart, ming, patterns);
  detectZiWeiInMing(chart, ming, patterns);

  // 助力格
  detectFuBiJiaMing(chart, patterns);
  detectChangQuJiaMing(chart, patterns);
  detectKuiYueJiaMing(chart, patterns);
  detectShuangLuChaoYuan(chart, ming, patterns);
  detectSanQiJiaHui(chart, patterns);
  detectHuaLuRuMing(chart, ming, patterns);

  // 恶格
  detectHuaJiRuMingQian(chart, patterns);
  detectYangTuoJiaJi(chart, patterns);
  detectHuoLingJiaMing(chart, patterns);
  detectKongJieJiaMing(chart, patterns);
  detectLianShaYang(chart, patterns);
  detectJuHuoYang(chart, patterns);
  detectLingChangTuoWu(chart, patterns);
  detectMaTouDaiJian(chart, ming, patterns);

  // 基础格局（提升识别覆盖率，让普通命盘也能识别 1-3 个）
  detectLuCunShouShen(chart, patterns);
  detectTianMaRuMing(chart, patterns);
  detectHuaLuRuCai(chart, patterns);
  detectHuaQuanRuGuan(chart, patterns);
  detectHuaKeRuMingShen(chart, patterns);
  detectJiYueTongLiangPartial(chart, ming, patterns);
  detectChangQuTongHui(chart, patterns);
  detectFuBiTongHui(chart, patterns);
  detectKuiYueTongHui(chart, patterns);
  detectKeQuanShuangHui(chart, patterns);

  return patterns;
}

// ────────────────── 命宫摘要（保持向后兼容）──────────────────
export function getMingGongSummary(chart: ZiweiChart): {
  stars: string[];
  keywords: string[];
  nature: string;
} {
  const mingPalace = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  if (!mingPalace) return { stars: [], keywords: [], nature: '' };

  const majorStars = mingPalace.stars.filter(s => s.type === 'major');
  const starNames = majorStars.map(s => s.name);

  const keywordMap: Record<string, string[]> = {
    '紫微': ['Tôn quý', 'Độc lập', 'Lãnh đạo'],
    '天机': ['Trí tuệ', 'Ứng biến', 'Giỏi mưu tính'],
    '太阳': ['Dương cương', 'Quan quý', 'Hào phóng'],
    '武曲': ['Tài phú', 'Kiên cường', 'Quyết đoán'],
    '天同': ['Ôn hòa', 'Hưởng phúc', 'Tùy duyên'],
    '廉贞': ['Tài nghệ', 'Đào hoa', 'Hay thay đổi'],
    '天府': ['Tài khố', 'Vững vàng', 'Bảo thủ'],
    '太阴': ['Dịu dàng', 'Tài phú', 'Tinh tế'],
    '贪狼': ['Dục vọng', 'Đào hoa', 'Đa tài'],
    '巨门': ['Biện bác', 'Hay suy nghĩ', 'Tài ăn nói'],
    '天相': ['Phụ tá', 'Hành chính', 'Vững chắc'],
    '天梁': ['Che chở', 'Y dược', 'Bề trên'],
    '七杀': ['Tướng tinh', 'Quả quyết', 'Cô khắc'],
    '破军': ['Khai sáng', 'Biến động', 'Phá cũ'],
  };

  const natureMap: Record<string, string> = {
    '紫微': 'Đế vương tinh', '天机': 'Trí tuệ tinh', '太阳': 'Quý nhân tinh',
    '武曲': 'Tài bạch tinh', '天同': 'Phúc đức tinh', '廉贞': 'Đào hoa tinh',
    '天府': 'Tài khố tinh', '太阴': 'Tài phú tinh', '贪狼': 'Đào hoa tinh',
    '巨门': 'Thị phi tinh', '天相': 'Ấn thụ tinh', '天梁': 'Âm phù tinh',
    '七杀': 'Tướng soái tinh', '破军': 'Biến động tinh',
  };

  const keywords = starNames.flatMap(n => keywordMap[n] ?? []).slice(0, 5);
  const nature = starNames.length > 0 ? (natureMap[starNames[0]] ?? '') : 'Cung trống';

  return { stars: starNames, keywords, nature };
}
