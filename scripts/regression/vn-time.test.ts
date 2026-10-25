import assert from 'node:assert/strict';
import { VN_SOUTH_PROVINCES, vnUtcOffset, standardMeridian, showChinaDstNote } from '../../lib/ziwei/vn-time';
import { VN_PROVINCES } from '../../lib/ziwei/cities-vn';
import { calcTrueSolarBranch, formToBirthInfo, formToSearchParams, searchParamsToForm } from '../../lib/ziwei/share';
import { viTerm } from '../../lib/i18n/vi';

// ── 省份表 ──
assert.equal(VN_PROVINCES.length, 63, '63 tỉnh/thành');
assert.equal(VN_PROVINCES[0].name, 'Hà Nội', 'default Hà Nội first');
assert.deepEqual([...VN_SOUTH_PROVINCES], [
  'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên',
  'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng',
  'Bình Phước', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa – Vũng Tàu', 'TP. Hồ Chí Minh',
  'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long', 'Đồng Tháp', 'An Giang', 'Kiên Giang',
  'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau',
]);
const names = VN_PROVINCES.map(p => p.name);
for (const s of VN_SOUTH_PROVINCES) assert.ok(names.includes(s), `${s} in province list`);
// 南方列表 = 表中从广治起的连续尾段
assert.deepEqual(names.slice(names.indexOf('Quảng Trị')), [...VN_SOUTH_PROVINCES]);
assert.ok(!VN_SOUTH_PROVINCES.includes('Quảng Bình'), 'Quảng Bình is north');

// ── 边界日期 ──
const SG = 'TP. Hồ Chí Minh', HN = 'Hà Nội';
assert.equal(vnUtcOffset(SG, 1959, 12, 31), 7);
assert.equal(vnUtcOffset(SG, 1960, 1, 1), 8);
assert.equal(vnUtcOffset(SG, 1975, 6, 12), 8);
assert.equal(vnUtcOffset(SG, 1975, 6, 13), 7);
assert.equal(vnUtcOffset('Quảng Trị', 1968, 5, 5), 8);
assert.equal(vnUtcOffset('Quảng Bình', 1968, 5, 5), 7);
assert.equal(vnUtcOffset(HN, 1968, 5, 5), 7, 'Hà Nội stays UTC+7');
assert.equal(standardMeridian('VN', SG, 1968, 5, 5), 120);
assert.equal(standardMeridian('VN', SG, 1990, 5, 5), 105);
assert.equal(standardMeridian('VN', HN, 1968, 5, 5), 105);
assert.equal(standardMeridian('CN', '北京市', 1990, 5, 5), 120);

// ── 夏令时只对中国 ──
assert.equal(showChinaDstNote('CN', 1990, 6, 1), true);
assert.equal(showChinaDstNote('VN', 1990, 6, 1), false);

// ── 真太阳时：Hà Nội vs Sài Gòn ──
// Hà Nội 105.85°E, UTC+7: 07:00 → +3.4 min → 辰(4)
assert.equal(calcTrueSolarBranch(7, 0, 105.85, 105), 4);
// Sài Gòn 1968 (UTC+8, 106.7°E): 07:00 → −53 min → 06:07 → 卯(3)
assert.equal(calcTrueSolarBranch(7, 0, 106.7, standardMeridian('VN', SG, 1968, 5, 5)), 3);
// Sài Gòn 1990 (UTC+7): 07:00 → +7 min → 辰(4)
assert.equal(calcTrueSolarBranch(7, 0, 106.7, standardMeridian('VN', SG, 1990, 5, 5)), 4);

const base = {
  name: '', year: '1968', month: '5', day: '5', clockHour: '7', clockMinute: '0',
  unknownTime: false, gender: 'male' as const,
};
const sg = formToBirthInfo({ ...base, country: 'VN', province: SG, city: SG, longitude: 106.7 });
assert.equal(sg.hour, 3, 'Sài Gòn 1968 07:00 → Mão');
const hn = formToBirthInfo({ ...base, country: 'VN', province: HN, city: HN, longitude: 105.85 });
assert.equal(hn.hour, 4, 'Hà Nội 1968 07:00 → Thìn');
// 无 country（旧链接/旧测试）按中国 120°E
const legacy = formToBirthInfo({ ...base, province: '', city: '', longitude: 120 });
assert.equal(legacy.hour, 4);

// 分享链接往返保留国家
const rt = searchParamsToForm(formToSearchParams({ ...base, country: 'VN', province: SG, city: SG, longitude: 106.7 }));
assert.equal(rt?.country, 'VN');
assert.equal(rt?.longitude, 106.7);
assert.equal(searchParamsToForm(new URLSearchParams('y=1990&m=1&d=1'))?.country, 'CN');

// ── viTerm ──
assert.equal(viTerm('紫微'), 'Tử Vi');
assert.equal(viTerm('命宫'), 'cung Mệnh');
assert.equal(viTerm('仆役宫'), 'cung Nô Bộc');
assert.equal(viTerm('化禄'), 'Hóa Lộc');
assert.equal(viTerm('甲子'), 'Giáp Tý');
assert.equal(viTerm('庙'), 'Miếu');
assert.equal(viTerm('太阳'), 'Thái Dương');
assert.equal(viTerm('紫微化禄'), 'Tử Vi Hóa Lộc');
assert.equal(viTerm('水二局'), 'Thủy nhị cục');
assert.equal(viTerm('未知术语XYZ'), '未知术语XYZ', 'unknown unchanged');

console.log('vn-time: OK');
