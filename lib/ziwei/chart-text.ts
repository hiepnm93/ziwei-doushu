import type { ZiweiChart } from './types';
import { viTerm } from '@/lib/i18n/vi';

/** 命盘 → 给 AI 的越南语纯文本摘要（服务端 /api/interpret 只收这段文字）。 */
export function chartText(c: ZiweiChart): string {
  const b = c.birthInfo;
  const lines = [
    `Giới tính: ${b.gender === 'male' ? 'Nam' : 'Nữ'}${c.yinYangGender ? ` (${viTerm(c.yinYangGender)})` : ''}, tuổi hiện tại: ${c.currentAge}`,
    `Cục: ${viTerm(c.wuxingJuName)}${c.mingZhu ? `, Mệnh chủ: ${viTerm(c.mingZhu)}` : ''}${c.shenZhu ? `, Thân chủ: ${viTerm(c.shenZhu)}` : ''}`,
  ];
  for (const p of c.palaces) {
    const tags = [p.isMingGong && 'Mệnh', p.isShenGong && 'Thân', p.isCurrentDaXian && 'đại hạn hiện tại'].filter(Boolean).join(', ');
    const stars = p.stars.length
      ? p.stars.map(s => `${viTerm(s.name)}${s.siHua ? ` (Hóa ${viTerm(s.siHua)})` : ''}`).join(', ')
      : 'Vô chính diệu';
    const age = p.daXianAge ? ` [${p.daXianAge[0]}-${p.daXianAge[1]} tuổi]` : '';
    lines.push(`- Cung ${viTerm(p.name)}${tags ? ` (${tags})` : ''}${age}: ${stars}`);
  }
  return lines.join('\n').slice(0, 4000);
}
