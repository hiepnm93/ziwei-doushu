/**
 * 出生地时区 → 真太阳时用的标准子午线。
 *
 * 表单时间 = 出生地当时的钟表时间。
 *   · 越南：UTC+7 → 105°E；
 *     南越（广治及以南）1960-01-01 至 1975-06-12（含）用 UTC+8 → 120°E。
 *   · 中国：UTC+8 → 120°E。夏令时只对中国出生提示（dst-cn.ts，不自动减 1 小时）。
 */
import { isChinaDST } from './dst-cn';

export type Country = 'VN' | 'CN';

/** 广治（Quảng Trị）及其以南全部省份 */
export const VN_SOUTH_PROVINCES: readonly string[] = [
  'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên',
  'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng',
  'Bình Phước', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa – Vũng Tàu', 'TP. Hồ Chí Minh',
  'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long', 'Đồng Tháp', 'An Giang', 'Kiên Giang',
  'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau',
];

const ymd = (y: number, m: number, d: number) => y * 10000 + m * 100 + d;

/** 越南出生地当日的 UTC 偏移（小时） */
export function vnUtcOffset(province: string, year: number, month: number, day: number): 7 | 8 {
  const t = ymd(year, month, day);
  return VN_SOUTH_PROVINCES.includes(province) && t >= 19600101 && t <= 19750612 ? 8 : 7;
}

/** 标准子午线（°E）：真太阳时经度修正 = (经度 − 子午线) × 4 分钟 */
export function standardMeridian(country: Country, province: string, year: number, month: number, day: number): number {
  return country === 'VN' ? vnUtcOffset(province, year, month, day) * 15 : 120;
}

/** 是否要显示中国夏令时提示（仅中国出生） */
export function showChinaDstNote(country: Country, year: number, month: number, day: number): boolean {
  return country === 'CN' && isChinaDST(year, month, day);
}
