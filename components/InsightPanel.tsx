'use client';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from './TimeNav';
import { viTerm } from '@/lib/i18n/vi';

interface SelectedSiHua {
  starName: string;
  siHua: string;
  view: TimeView;
}

interface InsightPanelProps {
  chart: ZiweiChart;
  selectedPalace?: Palace | null;
  selectedSiHua?: SelectedSiHua | null;
}

/**
 * 开源版不含 AI 解读接口（/api/interpret）：只显示所选宫位的星曜，并说明 AI 解读不可用。
 */
export default function InsightPanel({ chart, selectedPalace }: InsightPanelProps) {
  const palace = selectedPalace ?? chart.palaces.find(p => p.branch === chart.mingGongBranch);
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden card-glass p-4 gap-3">
      <div className="text-[9px] tracking-widest flex items-center gap-1.5" style={{ color: 'var(--t-faint)' }}>
        <span style={{ color: 'var(--t-gold)', opacity: 0.4 }}>✦</span>
        Luận giải
      </div>
      {palace && (
        <div className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
          <div className="font-semibold mb-1" style={{ color: 'var(--t-gold)' }}>{viTerm(palace.name)}</div>
          {palace.stars.length > 0
            ? palace.stars.map(s => `${viTerm(s.name)}${s.siHua ? ` (Hóa ${viTerm(s.siHua)})` : ''}`).join(' · ')
            : 'Vô chính diệu'}
        </div>
      )}
      <div className="text-[11px] rounded-lg px-3 py-2" style={{ border: '1px solid var(--t-border)', color: 'var(--t-faint)' }}>
        Luận giải bằng AI: Tính năng này chưa có trên bản mở nguồn.
      </div>
    </div>
  );
}
