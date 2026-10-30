'use client';
import { useState } from 'react';
import BirthForm from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import InsightPanel from '@/components/InsightPanel';
import StarDetailPanel from '@/components/StarDetailPanel';
import ChartSummary from '@/components/ChartSummary';
import ChatPanel from '@/components/ChatPanel';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace, Star } from '@/lib/ziwei/types';

/**
 * 起盘表单 → 同页显示命盘（首页 / /chart 共用）。
 * 命盘右栏：星曜详解（点星时）+ 宫位解读 / AI 解读 + AI 问答；下方：命盘总览。
 */
export default function ChartApp() {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [selectedStar, setSelectedStar] = useState<{ star: Star; palace: Palace } | null>(null);

  if (!chart) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <BirthForm onSubmit={(info: BirthInfo) => setChart(generateChart(info))} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <button
        type="button"
        onClick={() => { setChart(null); setSelectedPalace(null); setSelectedStar(null); }}
        className="mb-4 px-3.5 py-1.5 rounded-lg text-sm"
        style={{ border: '1px solid var(--bdr-med)', color: 'var(--tx-2)' }}
      >
        ← Lập lại lá số
      </button>

      <div className="chart-demo-split">
        <ChartBoard
          chart={chart}
          onPalaceSelect={setSelectedPalace}
          onStarSelect={(star, palace) => { setSelectedStar({ star, palace }); setSelectedPalace(palace); }}
        />
        <div className="flex flex-col gap-4 min-w-0">
          <StarDetailPanel
            star={selectedStar?.star ?? null}
            palaceName={selectedStar?.palace.name}
            onClose={() => setSelectedStar(null)}
          />
          <InsightPanel chart={chart} selectedPalace={selectedPalace} />
          <ChatPanel chart={chart} />
        </div>
      </div>

      <div className="mt-6">
        <ChartSummary chart={chart} />
      </div>
    </div>
  );
}
