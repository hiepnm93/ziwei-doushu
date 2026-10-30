'use client';
import { useState } from 'react';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from './TimeNav';
import { viTerm } from '@/lib/i18n/vi';
import { chartText } from '@/lib/ziwei/chart-text';

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

export default function InsightPanel({ chart, selectedPalace }: InsightPanelProps) {
  const palace = selectedPalace ?? chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const [ai, setAi] = useState<{ loading?: boolean; text?: string; error?: string }>({});

  async function interpret() {
    setAi({ loading: true });
    try {
      const r = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chartText(chart) }),
      });
      if (!r.ok || !r.body) {
        const j = await r.json().catch(() => ({}));
        return setAi({ error: j.error || 'Có lỗi, thử lại sau.' });
      }
      // streamed plain text: show each chunk as it arrives
      const reader = r.body.pipeThrough(new TextDecoderStream()).getReader();
      let text = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        text += value;
        setAi({ loading: true, text });
      }
      setAi(text.trim() ? { text: text.trim() } : { error: 'AI đang bận, thử lại sau ít phút.' });
    } catch {
      setAi(a => (a.text ? { text: a.text } : { error: 'Không kết nối được, thử lại sau.' }));
    }
  }

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
      <button
        onClick={interpret}
        disabled={ai.loading}
        className="text-[12px] rounded-lg px-3 py-2 font-semibold disabled:opacity-50"
        style={{ border: '1px solid var(--t-gold)', color: 'var(--t-gold)' }}
      >
        {ai.loading ? 'AI đang luận giải…' : ai.text ? 'Luận giải lại bằng AI' : '✦ Luận giải cả lá số bằng AI'}
      </button>
      {ai.error && <div className="text-[11px]" style={{ color: 'var(--t-faint)' }}>{ai.error}</div>}
      {ai.text && (
        <div className="text-[12px] leading-relaxed whitespace-pre-wrap overflow-y-auto" style={{ color: 'var(--t-text2)' }}>
          {ai.text}
        </div>
      )}
    </div>
  );
}
